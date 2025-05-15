from rest_framework import serializers
from django.contrib.auth.hashers import check_password
from .models import UserAccounts, userLogin, Profile,Product,SignUp
from django.contrib.auth.models import User
class UserAccount(serializers.ModelSerializer):
    class Meta:
        model = UserAccounts
        fields='__all__'
        
        
class userSerializer(serializers.ModelSerializer):
    class Meta:
        model=userLogin
        fields='__all__'
        extra_kwargs={"password":{'write_only':True}}       
    
    def create(self, validated_data):
        user=User.objects.create_user(**validated_data);
        return user    

    
class LoginSerializer(serializers.Serializer):
        username=serializers.CharField()
        password=serializers.CharField(write_only=True)
        
        def validate(self, data):
            
            try:
                user=userLogin.objects.filter(username=data['username']).first()
                if user and check_password(data['password'],user.password):
                    return data
                raise serializers.ValidationError("Invalid credentials")
            except userLogin.DoesNotExist:
                raise serializers.ValidationError("Invalid credentials")
            

class userSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = userLogin
        fields = '__all__'
        

class userProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=Profile
        fields = '__all__'
    

class productSerializer(serializers.ModelSerializer):
    class Meta:
        model= Product
        fields='__all__'
        extra_kwargs = {
            'profilePicture': {'required': False}
        }
                                   