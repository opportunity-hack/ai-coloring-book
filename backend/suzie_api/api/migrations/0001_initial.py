# Generated by Django 3.2 on 2024-01-29 08:28

from django.db import migrations, models
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Drawings',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('school', models.CharField(max_length=20, null=True)),
                ('created_by', models.CharField(max_length=20, null=True)),
                ('creative_url', models.TextField(null=True)),
                ('ai_creative_url', models.TextField(null=True)),
                ('use_ai', models.BooleanField(null=True)),
                ('is_active', models.BooleanField(null=True)),
                ('created_on', models.DateTimeField(auto_now_add=True, null=True)),
                ('modified_on', models.DateTimeField(auto_now_add=True, null=True)),
            ],
            options={
                'db_table': 'drawings',
            },
        ),
        migrations.CreateModel(
            name='NonProfits',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20, null=True)),
                ('about', models.TextField(null=True)),
                ('url', models.TextField(null=True)),
                ('created_on', models.DateTimeField(auto_now_add=True, null=True)),
                ('modified_on', models.DateTimeField(auto_now_add=True, null=True)),
            ],
            options={
                'db_table': 'nonprofits',
            },
        ),
        migrations.CreateModel(
            name='Sponsors',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20, null=True)),
                ('about', models.TextField(null=True)),
                ('logo', models.TextField(null=True)),
                ('created_on', models.DateTimeField(auto_now_add=True, null=True)),
                ('modified_on', models.DateTimeField(auto_now_add=True, null=True)),
            ],
            options={
                'db_table': 'sponsors',
            },
        ),
        migrations.CreateModel(
            name='TestTable',
            fields=[
                ('report_type_id', models.AutoField(primary_key=True, serialize=False)),
                ('report_type', models.TextField(null=True)),
            ],
            options={
                'db_table': 'report_type',
            },
        ),
        migrations.CreateModel(
            name='Books',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20, null=True)),
                ('about', models.TextField(null=True)),
                ('url', models.TextField(null=True)),
                ('is_published', models.BooleanField(null=True)),
                ('created_on', models.DateTimeField(auto_now_add=True, null=True)),
                ('modified_on', models.DateTimeField(auto_now_add=True, null=True)),
                ('sponsors', models.ManyToManyField(null=True, to='api.Sponsors')),
            ],
            options={
                'db_table': 'books',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('uid', models.UUIDField(default=uuid.uuid4, editable=False, unique=True, verbose_name='Public identifier')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('first_name', models.CharField(blank=True, max_length=30)),
                ('last_name', models.CharField(blank=True, max_length=50)),
                ('role', models.PositiveSmallIntegerField(blank=True, choices=[(1, 'Admin'), (2, 'Manager'), (3, 'Employee')], default=3, null=True)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('modified_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('created_by', models.EmailField(max_length=254)),
                ('modified_by', models.EmailField(max_length=254)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
