from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('description', models.TextField(blank=True)),
                ('status', models.CharField(choices=[('healthy', 'Healthy'), ('degraded', 'Degraded'), ('down', 'Down')], default='healthy', max_length=20)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
