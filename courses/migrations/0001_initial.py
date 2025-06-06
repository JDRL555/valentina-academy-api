# Generated by Django 4.1.13 on 2024-06-21 20:38

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Courses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(max_length=250)),
                ('duration', models.TimeField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=20)),
                ('recipe', models.CharField(max_length=500, null=True)),
                ('created_at', models.DateField(default=datetime.date.today)),
                ('category', models.ForeignKey(db_column='category', on_delete=django.db.models.deletion.CASCADE, to='courses.category')),
            ],
        ),
        migrations.CreateModel(
            name='Courses_media',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url_video', models.TextField(max_length=800)),
                ('url_cover', models.TextField(max_length=800)),
            ],
        ),
        migrations.CreateModel(
            name='Purchased_course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_purchased', models.BooleanField(default=False)),
                ('completed', models.BooleanField(default=False)),
                ('purchased_at', models.DateField(default=datetime.date.today)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.courses')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='courses',
            name='media',
            field=models.ForeignKey(db_column='courses_media', on_delete=django.db.models.deletion.CASCADE, to='courses.courses_media'),
        ),
        migrations.AddField(
            model_name='courses',
            name='user',
            field=models.ForeignKey(db_column='user', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
