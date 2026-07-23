from django.contrib.auth import backends
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from rest_framework import permissions
import jwt
from django.conf import settings
from django.contrib.auth import get_user_model

from rest_framework import permissions

UserModel = get_user_model()


class IsAdmin(permissions.BasePermission):
    """
    Custom permission to only allow admins to access a view.
    """

    def has_permission(self, request, view):
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return False
        try:
            # Split the header to extract the token part
            token = auth_header.split(' ')[1]
            # Decode the payload
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            # Check if the role in the token is 1 for admin
            user_obj = UserModel.objects.get(id=payload.get('user_id'))
            request.user_obj = user_obj
            return user_obj.role == 1

        except (IndexError, jwt.exceptions.DecodeError, jwt.exceptions.InvalidTokenError):
            return False


def get_request_user(request):
    """Resolve the user from the JWT Authorization header, or None.

    Used by views whose permission class doesn't attach request.user_obj
    (e.g. AllowAny list endpoints that still scope results for school admins).
    """
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return None
    try:
        token = auth_header.split(' ')[1]
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return UserModel.objects.get(id=payload.get('user_id'))
    except (IndexError, jwt.exceptions.DecodeError, jwt.exceptions.InvalidTokenError,
            UserModel.DoesNotExist):
        return None


class IsStaffAdmin(permissions.BasePermission):
    """
    Allows site admins (role 1) and school admins (role 3). Views must apply
    school scoping themselves for role 3 via request.user_obj.school.
    """

    def has_permission(self, request, view):
        user_obj = get_request_user(request)
        if user_obj is None:
            return False
        request.user_obj = user_obj
        return user_obj.role in (UserModel.ADMIN, UserModel.SCHOOL_ADMIN)


class IsSponsor(permissions.BasePermission):
    """
    Custom permission to only allow sponsors to access a view.
    """

    def has_permission(self, request, view):
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return False
        try:
            # Split the header to extract the token part
            token = auth_header.split(' ')[1]
            # Decode the payload
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            # Check if the role in the token is 1 for admin
            user_obj = UserModel.objects.get(id=payload.get('user_id'))
            request.user_obj = user_obj
            return user_obj.role == 2

        except (IndexError, jwt.exceptions.DecodeError, jwt.exceptions.InvalidTokenError):
            return False


class AllUsers(permissions.BasePermission):
    """
    Custom permission to only allow sponsors to access a view.
    """

    def has_permission(self, request, view):
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return False
        try:
            # Split the header to extract the token part
            token = auth_header.split(' ')[1]
            # Decode the payload
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            # Check if the role in the token is 1 for admin
            user_obj = UserModel.objects.get(id=payload.get('user_id'))
            request.user_obj = user_obj
            return user_obj.role in [1, 2]

        except (IndexError, jwt.exceptions.DecodeError, jwt.exceptions.InvalidTokenError):
            return False
