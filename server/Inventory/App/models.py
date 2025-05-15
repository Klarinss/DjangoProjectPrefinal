from django.db import models
from django.contrib.auth.hashers import make_password

class UserAccounts(models.Model):
    username = models.CharField(max_length=100)
    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100)
    address = models.TextField(max_length=150)

    def __str__(self):
        return f'UserAccount: {self.username} {self.fname} {self.lname} {self.address}'

class userLogin(models.Model):
    USER_TYPES = [
        ('seller', 'Seller'),
        ('customer', 'Customer')
    ]
    
    userType = models.CharField(
        max_length=20,
        choices=USER_TYPES,
        default='customer'
    )
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    
    def save(self, *args, **kwargs):
        if self.password:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)    

    def __str__(self):
        return f'Login for user: {self.username}'
     
class SignUp(models.Model):
    userType=models.CharField(max_length=100,unique=True,default='customer')
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        if self.password:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username     
    

class Profile (models.Model):
    userProfile=models.OneToOneField(
        userLogin,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    profilePicture= models.ImageField(
        upload_to='static/images/profileImages/'
    )
    firstName=models.CharField(max_length=100);
    lastName=models.CharField(max_length=100);
    phone=models.CharField(max_length=11, blank=True)
    address=models.CharField(max_length=100);


class Product (models.Model):
    
    profilePicture= models.ImageField(
        upload_to='static/images/ProductImages/',
        null=True
    )
    productName=models.CharField(max_length=100);
    description=models.TextField(blank=True)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    quantity=models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.productName}"
    def update_product(self, **kwargs):
        """Update product attributes"""
        for key, value in kwargs.items():
            setattr(self, key, value)
        self.save()
        
    def delete_product(self):
        """Delete the product"""
        self.delete()
            