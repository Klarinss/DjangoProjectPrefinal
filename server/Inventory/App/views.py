from rest_framework.decorators import api_view,parser_classes
from rest_framework.response import Response
from rest_framework import status
from .models import UserAccounts, userLogin, SignUp, Profile,Product
from .serializer import UserAccount, LoginSerializer, userSignupSerializer, userProfileSerializer,productSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import HttpRequest
from rest_framework.request import Request
@api_view(['GET'])
def get_users(request):
   users= UserAccounts.objects.all();
   serializedData=UserAccount(users,many=True).data
   return Response(serializedData)

@api_view(['POST'])
def add_users(request):
   data=request.data;
   serializer= UserAccount(data=data);
   if serializer.is_valid:
      serializer.save()
      return Response(serializer.data , status=status.HTTP_201_CREATED)
   return Response(serializer.data , status=status.HTTP_400_BAD_REQUEST) 


@api_view(['POST'])
def login_view(request):
   serializer= LoginSerializer(data=request.data)
   if serializer.is_valid():
      user= userLogin.objects.get(username=serializer.validated_data['username'])
      refreshToken=RefreshToken.for_user(user)
      return Response({
         'id':user.id,
         'token':str(refreshToken.access_token),
         'refreshToken':str(refreshToken),
         'username':user.username,
         'userType':user.userType
      })
   return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   

@api_view(['GET'])
def login_viewData(request):
    try:
        users = userLogin.objects.all()
        if not users.exists():
            return Response({"message": "No users found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = userSignupSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response(
            {"error": str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
def signup_view(request):
    serializer = userSignupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
@api_view(["POST","GET"])
def profile_detail(request,pk):
   try:
      profile=Profile.objects.get(userProfile__id=pk)
   except Profile.DoesNotExist:
      return Response(
         {"message": f"No profile found for user ID {pk}"},
         status=status.HTTP_404_NOT_FOUND)
   profile, created = Profile.objects.get_or_create(
        userProfile=profile,
        defaults={
            'firstName': '',
            'lastName': '',
            'phone': '',
            'address': ''
        }
    )
   
   if request.method =='GET':
      serializer=userProfileSerializer(profile);
      data=serializer.data
      data['is_new_profile'] = created
      return Response(data)
   elif request.method =='POST':
      serializer =userProfileSerializer(profile, data=request.data, partial=True)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
   
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@parser_classes([MultiPartParser, FormParser])
def productList(request: Request, pk=None):
    try:
        if pk:
            product = Product.objects.get(pk=pk)
            serializer = productSerializer(product)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        products = Product.objects.all()
        serializer = productSerializer(products, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        data = request.data.copy() 
        if 'profilePicture' in request.FILES:
            data['profilePicture'] = request.FILES['profilePicture']
            
        serializer = productSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        serializer = productSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)