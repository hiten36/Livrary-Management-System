from django.shortcuts import render,redirect
from django.http import HttpResponse
from .models import Donators,Contact
from django.contrib.auth import login,authenticate,logout
from django.contrib.auth.models import User
from django.contrib import messages


# Create your views here.
def index(request):
    donators=Donators.objects.all()
    if request.method=='POST':
        don_user=request.POST.get('user3').capitalize()
        don_book=request.POST.get('book3').capitalize()
        don_cat=request.POST.get('book_cat').capitalize()
        donate=Donators(don_user_name=don_user,don_book_name=don_book,don_book_cat=don_cat)
        donate.save()
        return render(request,'lib/index.html',{'donators':donators})
    return render(request,'lib/index.html',{'donators':donators})
def handlesignin(request):
    if request.method=='POST':
        user2=request.POST.get('user2')
        pass2=request.POST.get('pass2')
        cpass2=request.POST.get('cpass2')
        if pass2!=cpass2:
            messages.error(request,"Please enter same password in both columns.")
            return redirect('/library')
        else:
            users=User.objects.create_user(user2,'',pass2)
        users.save()
        messages.success(request,'Sign Up success! You can now login.')
        return redirect('/library')
    return HttpResponse('Error - 404 Not Found')
def handlelogin(request):
    if request.method=='POST':
        user1=request.POST.get('user1')
        pass1=request.POST.get('pass1')
        users=authenticate(username=user1,password=pass1)
        if users is not None:
            login(request,users)
            messages.success(request,'Login Success!')
            return redirect('/')
        else:
            messages.error(request,'Invalid Credentials! Please try again.')
            return redirect('/')
def handlelogout(request):
    logout(request)
    messages.success(request,'You have been logged out successfully.')
    return redirect('/')
def contact(request):
    if request.method=='POST':
        con_user=request.POST.get('user')
        con_email=request.POST.get('email')
        con_phone=request.POST.get('phone')
        con_location=request.POST.get('location')
        con_desc=request.POST.get('desc')
        contacts=Contact(con_user=con_user,con_email=con_email,con_phone=con_phone,con_location=con_location,con_desc=con_desc)
        contacts.save()
        messages.success(request,'Your feedback has been sent.You will get response soon.')
        return render(request,'lib/contact.html')
    return render(request,'lib/contact.html')
def about(request):
    return render(request,'lib/about.html')
def search(request):
    query=request.GET.get('query','')
    if len(query)>58:
        posts=[]
    posts=Donators.objects.filter(don_user_name__icontains=query)
    posts1=Donators.objects.filter(don_book_name__icontains=query)
    posts2=Donators.objects.filter(don_book_cat__icontains=query)
    posts=posts.union(posts1,posts2)
    params={'posts':posts,'query':query}
    return render(request,'lib/search.html',params)