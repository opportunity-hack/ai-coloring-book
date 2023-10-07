from django.db import models


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
    created_on = models.DateTimeField(null=True)
    modified_on = models.DateTimeField(null=True)

    class Meta:
        db_table = "drawings"

#
# class NonProfits(models.Model):
#     id = models.AutoField(primary_key=True)
#     name = models.CharField(max_length=20, null=True)
#     about = models.TextField(null=True)
#     url = models.TextField(null=True)
#     created_on = models.DateTimeField(null=True)
#     modified_on = models.DateTimeField(null=True)
#
#     class Meta:
#         db_table = "nonprofits"
#
#
# class Sponsors(models.Model):
#     id = models.AutoField(primary_key=True)
#     name = models.CharField(max_length=20, null=True)
#     about = models.TextField(null=True)
#     url = models.TextField(null=True)
#     created_on = models.DateTimeField(null=True)
#     modified_on = models.DateTimeField(null=True)
#
#     class Meta:
#         db_table = "sponsors"


# class Sponsors(models.Model):
#     id = models.AutoField(primary_key=True)
#     name = models.CharField(max_length=20, null=True)
#     about = models.TextField(null=True)
#     url = models.TextField(null=True)
#     created_on = models.DateTimeField(null=True)
#     modified_on = models.DateTimeField(null=True)
#
#     class Meta:
#         db_table = "sponsors"
