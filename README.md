# RESILIENCE-M (React + Django)

Voici une version complète en **React (frontend)** et **Django REST (backend)**,
avec support **Docker Compose**.

## Récupérer / extraire le projet

Si tu as un `.zip` :

```bash
unzip RESILIENCE-M.zip
cd RESILIENCE-M
```

Si tu utilises git :

```bash
git clone <url-du-repo>
cd RESILIENCE-M
```

---

## Démarrage rapide avec Docker (recommandé)

> Prérequis: Docker + Docker Compose installés.

Depuis la racine du projet :

```bash
docker compose up --build
```

Puis ouvre :
- Frontend React: `http://localhost:5173`
- API Django: `http://localhost:8000/api/services/`

### Arrêter

```bash
docker compose down
```

### Réinitialiser complètement (conteneurs/images)

```bash
docker compose down --rmi local
```

---

## Lancer sans Docker (optionnel)

## 1) Backend Django

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py shell -c "from monitor.models import Service; Service.objects.get_or_create(name='API Gateway', defaults={'description':'Point d\'entrée'}); Service.objects.get_or_create(name='Paiements', defaults={'description':'Flux de paiement'}); Service.objects.get_or_create(name='Notifications', defaults={'description':'Emails et SMS'})"
python manage.py runserver
```

API principale : `http://127.0.0.1:8000/api/services/`

## 2) Frontend React

```bash
cd frontend
npm install
npm run dev
```

Application : `http://127.0.0.1:5173`

---

## Fonctionnement
- L'écran affiche la liste des services.
- Un clic sur une carte fait tourner le statut : `healthy -> degraded -> down`.
- Le statut est sauvegardé côté Django via API REST.
