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
