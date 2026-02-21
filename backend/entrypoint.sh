#!/bin/sh
set -e

python manage.py migrate
python manage.py shell -c "from monitor.models import Service; Service.objects.get_or_create(name='API Gateway', defaults={'description':'Point d\'entrée'}); Service.objects.get_or_create(name='Paiements', defaults={'description':'Flux de paiement'}); Service.objects.get_or_create(name='Notifications', defaults={'description':'Emails et SMS'})"

exec python manage.py runserver 0.0.0.0:8000
