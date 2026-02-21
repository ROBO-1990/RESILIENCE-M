from django.test import TestCase
from rest_framework.test import APIClient

from .models import Service


class ServiceApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list_services(self):
        Service.objects.create(name='API Gateway', description='Entry point', status='healthy')
        response = self.client.get('/api/services/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
