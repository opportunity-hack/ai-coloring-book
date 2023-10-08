from django.db import models

import uuid
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils import timezone
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _

# from django.db import models
# from django.contrib.auth.models import AbstractUser, Group


class TestTable(models.Model):
    report_type_id = models.AutoField(primary_key=True)
    report_type = models.TextField(null=True)

    class Meta:
        db_table = "report_type"


class Drawings(models.Model):
    id = models.AutoField(primary_key=True)
    school = models.CharField(max_length=20, null=True)
    created_by = models.CharField(max_length=20, null=True)
    creative_url = models.TextField(null=True)
    is_active = models.BooleanField(null=True)
    created_on = models.DateTimeField(null=True, auto_now_add=True)
    modified_on = models.DateTimeField(null=True, auto_now_add=True)

    class Meta:
        db_table = "drawings"


class NonProfits(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20, null=True)
    about = models.TextField(null=True)
    url = models.TextField(null=True)
    created_on = models.DateTimeField(null=True, auto_now_add=True)
    modified_on = models.DateTimeField(null=True, auto_now_add=True)

    class Meta:
        db_table = "nonprofits"


class Sponsors(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20, null=True)
    about = models.TextField(null=True)
    logo = models.TextField(null=True)
    url = models.TextField(null=True)
    created_on = models.DateTimeField(null=True, auto_now_add=True)
    modified_on = models.DateTimeField(null=True, auto_now_add=True)

    class Meta:
        db_table = "sponsors"


class Books(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20, null=True)
    about = models.TextField(null=True)
    url = models.TextField(null=True)
    sponsors = models.ManyToManyField(Sponsors, null=True)
    nonprofits = models.ManyToManyField(NonProfits, null=True)
    drawings = models.ManyToManyField(Drawings, null=True)
    is_published = models.BooleanField(null=True)
    created_on = models.DateTimeField(null=True, auto_now_add=True)
    modified_on = models.DateTimeField(null=True, auto_now_add=True)

    class Meta:
        db_table = "books"


class CustomUserManager(BaseUserManager):
    """
    Custom user model where the email address is the unique identifier
    and has an is_admin field to allow access to the admin app
    """
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError(_("The email must be set"))
        if not password:
            raise ValueError(_("The password must be set"))
        email = self.normalize_email(email)

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', 1)

        if extra_fields.get('role') != 1:
            raise ValueError('Superuser must have role of Global Admin')
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    # These fields tie to the roles!
    ADMIN = 1
    MANAGER = 2
    EMPLOYEE = 3

    ROLE_CHOICES = (
        (ADMIN, 'Admin'),
        (MANAGER, 'Manager'),
        (EMPLOYEE, 'Employee')
    )

    # Roles created here
    uid = models.UUIDField(unique=True, editable=False, default=uuid.uuid4, verbose_name='Public identifier')
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, blank=True, null=True, default=3)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    created_date = models.DateTimeField(default=timezone.now)
    modified_date = models.DateTimeField(default=timezone.now)
    created_by = models.EmailField()
    modified_by = models.EmailField()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

#
# class User(AbstractUser):
#     groups = models.ForeignKey(Group, on_delete=models.CASCADE)
#     email = models.EmailField(max_length=50, unique=True)
#
#     REQUIRED_FIELDS = ['groups_id', 'email']
#
#     class Meta:
#         verbose_name = 'user'
#         verbose_name_plural = 'users'
#
#     def get_full_name(self):
#         return '%s %s' % (self.first_name, self.last_name)
#
#     def get_short_name(self):
#         return self.first_name
#
#     def __str__(self):
#         return self.username
