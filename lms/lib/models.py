from django.db import models
from django.utils.timezone import now

# Create your models here.
class Donators(models.Model):
    don_id=models.AutoField(primary_key=True)
    don_user_name=models.CharField(max_length=30)
    don_book_name=models.CharField(max_length=300)
    don_book_cat=models.CharField(max_length=30)
    don_ts=models.DateField(default=now)
    
    def __str__(self):
        return self.don_book_name

class Contact(models.Model):
    con_id=models.AutoField(primary_key=True)
    con_user=models.CharField(max_length=30)
    con_email=models.CharField(max_length=90)
    con_phone=models.CharField(max_length=20)
    con_location=models.CharField(max_length=200)
    con_desc=models.TextField()
    con_ts=models.DateField(default=now)