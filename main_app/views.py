from django.shortcuts import render

def website(request):
    return render(request, 'main_app/website.html')

def portfolio(request):
    return render(request, 'main_app/portfolio.html')
