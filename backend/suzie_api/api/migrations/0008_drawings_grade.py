from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0007_auto_20240219_0239"),
    ]

    operations = [
        migrations.AddField(
            model_name="drawings",
            name="grade",
            field=models.CharField(max_length=20, null=True),
        ),
    ]
