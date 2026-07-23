from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_drawings_grade'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='school',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.PositiveSmallIntegerField(
                blank=True,
                choices=[(1, 'Admin'), (2, 'Sponsor'), (3, 'School Admin')],
                default=None,
                null=True,
            ),
        ),
    ]
