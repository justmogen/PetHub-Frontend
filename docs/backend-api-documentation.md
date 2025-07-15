# PawHub Backend API Documentation

## Overview

PawHub backend is a Django REST Framework application that provides a comprehensive pet marketplace API. The backend handles pet listings, breeder management, user authentication, and advanced filtering capabilities.

## Project Structure

```
pet_pamoja-hub/
├── manage.py                    # Django management script
├── requirements.txt             # Python dependencies
├── docker-compose.yml           # Container orchestration
├── Dockerfile                   # Container configuration
├── pet_hub/                     # Main Django project
│   ├── settings.py              # Project settings
│   ├── urls.py                  # Main URL configuration
│   ├── wsgi.py                  # WSGI application
│   └── asgi.py                  # ASGI application
├── core/                        # Shared models and utilities
│   ├── models.py                # Base models (TimeStamped, SoftDelete)
│   └── ...
├── users/                       # User authentication system
│   ├── models.py                # Custom user model
│   ├── authentication.py        # JWT authentication
│   ├── views.py                 # Auth views
│   └── urls.py                  # Auth endpoints
├── pets/                        # Pet management (MAIN APP)
│   ├── models/                  # Pet-related models
│   ├── serializers/             # API serializers
│   ├── views/                   # API views
│   ├── services/                # Business logic
│   ├── fixtures/                # Sample data
│   └── urls.py                  # Pet endpoints
├── breeder/                     # Breeder management
│   ├── models.py                # Breeder model
│   └── ...
└── docs/                        # API documentation
```

## Core Models

### 1. Pet Model (`pets/models/pet.py`)

```python
class Pet(TimeStampedModel, SoftDeleteModel):
    # Basic Information
    name = CharField(max_length=100)
    description = TextField(blank=True)
    breed = ForeignKey('pets.Breed', on_delete=PROTECT)
    date_of_birth = DateField(null=True, blank=True)
    gender = CharField(choices=Gender.choices)
    size = CharField(choices=Size.choices)
    weight = DecimalField(max_digits=5, decimal_places=2)
    color = CharField(max_length=50)
    secondary_colors = JSONField(default=list)

    # Status and Pricing
    status = CharField(choices=Status.choices, default=AVAILABLE)
    price = DecimalField(max_digits=10, decimal_places=2)
    discount_price = DecimalField(null=True, blank=True)
    featured = BooleanField(default=False)

    # Health & Documentation
    dewormed = BooleanField(default=False)
    health_certificate = FileField(upload_to='pets/health_certificates/')
    medical_history = TextField(blank=True)
    registration_papers = FileField(upload_to='pets/registration/')

    # Physical & Behavioral
    spayed_neutered = BooleanField(default=False)
    microchipped = BooleanField(default=False)
    temperament_notes = TextField(blank=True)
    energy_level = PositiveSmallIntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    exercise_needs = PositiveSmallIntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    grooming_needs = PositiveSmallIntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    trainability = PositiveSmallIntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    is_good_with_kids = BooleanField(default=False)

    # Media
    main_photo = ImageField(upload_to='pets/images/')
    photo_gallery = JSONField(default=list)
    videos = JSONField(default=list)

    # Lineage
    father = ForeignKey('pets.PetParent', related_name='father_of')
    mother = ForeignKey('pets.PetParent', related_name='mother_of')
    pedigree = FileField(upload_to='pets/pedigree/')

    # Location & Availability
    location = CharField(max_length=100)
    available_from = DateField(null=True, blank=True)
    breeder = ForeignKey('breeder.Breeder', on_delete=CASCADE)
```

**Key Properties:**

- `age_months`: Calculated age in months
- `is_puppy`: Boolean for pets under 1 year
- `current_price`: Returns discount_price if available, else price
- `discount_percentage`: Calculated discount percentage
- `vaccines_received`: List of vaccines from vaccination records
- `is_fully_vaccinated`: Boolean based on vaccination status

**Status Choices:**

- `AVAILABLE`: Ready for adoption
- `RESERVED`: Temporarily held for buyer
- `SOLD`: Successfully adopted
- `UNAVAILABLE`: Not currently available

### 2. Breed Model (`pets/models/breed.py`)

```python
class Breed(TimeStampedModel, SoftDeleteModel):
    # Basic Information
    species = ForeignKey('pets.Species', on_delete=PROTECT)
    name = CharField(max_length=100, db_index=True)
    image = ImageField(upload_to='breeds/')
    slug = SlugField(max_length=60, unique=True)
    description = TextField(blank=True)

    # Basic breed information
    origin_country = CharField(max_length=100)
    breed_group = CharField(max_length=100)
    popularity_rank = PositiveIntegerField(null=True, blank=True)

    # Size and Physical Characteristics
    size_category = CharField(choices=SIZE_CHOICES)
    # Additional breed-specific fields...
```

### 3. Breeder Model (`breeder/models.py`)

```python
class Breeder(TimeStampedModel):
    name = CharField(max_length=100, unique=True)
    slug = SlugField(max_length=120, unique=True)

    # Profile
    bio = TextField(blank=True)
    location = CharField(max_length=150)
    geo_location = PointField(geography=True, null=True)  # GeoDjango
    avatar = ImageField(upload_to='breeders/avatars/')

    # Business Information
    license_number = CharField(max_length=50)
    years_of_experience = PositiveIntegerField()
    specialties = JSONField(default=list)
```

## API Endpoints

### Base URL Structure

All API endpoints are prefixed with `/api/pets/`

### Pet Endpoints

#### 1. List/Create Pets

```
GET  /api/pets/pets/          # List all pets with filtering
POST /api/pets/pets/          # Create a new pet (authenticated)
```

**Query Parameters for GET:**

```typescript
interface PetQueryParams {
  // Pagination
  page?: number
  limit?: number

  // Search
  search?: string              // Search in name, description, breed, location

  // Filtering
  min_price?: number
  max_price?: number
  breed?: string               // Breed slug
  species?: string             // Species slug
  gender?: 'male' | 'female'
  size?: 'small' | 'medium' | 'large' | 'giant'
  location?: string            // Location contains

  // Health & Characteristics
  is_good_with_kids?: boolean
  vaccinated?: boolean
  dewormed?: boolean
  spayed_neutered?: boolean
  microchipped?: boolean

  // Status
  available?: boolean          // Filter for available pets only
  featured?: boolean           # Filter for featured pets only

  // Ordering
  ordering?: string            // 'price', '-price', 'created_at', '-created_at', 'name'
}
```

**Response Format:**

```typescript
interface PetListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PetListItem[];
}

interface PetListItem {
  id: string;
  name: string;
  breed: string;
  breed_name: string;
  species_name: string;
  gender: "male" | "female";
  gender_display: string;
  size: string;
  size_display: string;
  price: number;
  discount_price?: number;
  featured: boolean;
  status: "available" | "reserved" | "sold" | "unavailable";
  main_photo: string;
  breeder_name: string;
  location: string;
}
```

#### 2. Pet Detail

```
GET /api/pets/pets/{id}/      # Get detailed pet information
PUT /api/pets/pets/{id}/      # Update pet (authenticated)
DELETE /api/pets/pets/{id}/   # Delete pet (authenticated)
```

**Response Format:**

```typescript
interface PetDetail {
  // Basic Information
  id: string;
  name: string;
  breed: BreedDetail;
  date_of_birth: string;
  gender: "male" | "female";
  gender_display: string;
  size: string;
  size_display: string;
  weight: number;
  color: string;
  secondary_colors: string[];
  description: string;

  // Status and Pricing
  status: string;
  status_display: string;
  price: number;
  discount_price?: number;
  featured: boolean;
  available_from: string;

  // Health & Documentation
  dewormed: boolean;
  health_certificate: string;
  medical_history: string;
  registration_papers: string;

  // Physical & Behavioral
  spayed_neutered: boolean;
  microchipped: boolean;
  temperament_notes: string;
  energy_level: number;
  exercise_needs: number;
  grooming_needs: number;
  trainability: number;
  is_good_with_kids: boolean;

  // Media
  main_photo: string;
  photo_gallery: string[];
  videos: string[];

  // Lineage
  father?: PetParent;
  mother?: PetParent;
  pedigree: string;

  // Location & Relationships
  location: string;
  breeder: string; // Breeder name
  vaccinations: VaccinationRecord[];

  // Computed Properties
  is_fully_vaccinated: boolean;
}
```

### Breed Endpoints

#### 1. List/Create Breeds

```
GET  /api/pets/breeds/        # List all breeds
POST /api/pets/breeds/        # Create breed (authenticated)
```

#### 2. Breed Detail

```
GET /api/pets/breeds/{slug}/  # Get breed details by slug
```

### Species Endpoints

```
GET /api/pets/species/        # List all species
GET /api/pets/species/{slug}/ # Get species details
```

### Vaccination Endpoints

```
GET  /api/pets/pets/{pet_id}/vaccinations/           # List pet's vaccinations
POST /api/pets/pets/{pet_id}/vaccinations/           # Add vaccination record
GET  /api/pets/pets/{pet_id}/vaccinations/{record_id}/ # Get vaccination detail
PUT  /api/pets/pets/{pet_id}/vaccinations/{record_id}/ # Update vaccination
```

## Advanced Filtering System

### Filter Implementation (`pets/views/pet_views.py`)

```python
class PetFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    breed = django_filters.CharFilter(field_name='breed__slug')
    species = django_filters.CharFilter(field_name='breed__species__slug')
    gender = django_filters.CharFilter(lookup_expr='iexact')
    size = django_filters.CharFilter(lookup_expr='iexact')
    location = django_filters.CharFilter(lookup_expr='icontains')
    is_good_with_kids = django_filters.BooleanFilter()
    vaccinated = django_filters.BooleanFilter()
    dewormed = django_filters.BooleanFilter()
    spayed_neutered = django_filters.BooleanFilter()
    microchipped = django_filters.BooleanFilter()
    available = django_filters.BooleanFilter(field_name='status', method='filter_available')
    featured = django_filters.BooleanFilter()

    def filter_available(self, queryset, name, value):
        if value:
            return queryset.filter(status='available')
        return queryset
```

### Search Functionality

- **Full-text search** across: name, description, breed name, location
- **Search fields**: `['name', 'description', 'breed__name', 'location']`
- **Case-insensitive** matching

### Ordering Options

- `price` / `-price`: Price ascending/descending
- `created_at` / `-created_at`: Date added ascending/descending
- `name`: Alphabetical by name
- **Default**: `['-featured', '-created_at']` (Featured first, then newest)

## Database Optimizations

### Indexes

```python
# Pet model indexes
indexes = [
    models.Index(fields=['breed', 'status']),
    models.Index(fields=['status']),
    models.Index(fields=['price']),
    models.Index(fields=['gender', 'breed']),
    models.Index(fields=['size', 'breed']),
    models.Index(fields=['featured', 'status']),
    models.Index(fields=['location', 'status']),
]
```

### Query Optimization

```python
# Optimized queryset with select_related and prefetch_related
queryset = Pet.objects.select_related(
    'breed',
    'breed__species',
    'breeder',
    'father',
    'mother'
).prefetch_related(
    'vaccinations'
).filter(deleted_at__isnull=True)
```

### Constraints

```python
constraints = [
    models.CheckConstraint(
        check=models.Q(price__gt=0),
        name='positive_price'
    ),
    models.CheckConstraint(
        check=models.Q(discount_price__isnull=True) | models.Q(discount_price__gt=0),
        name='positive_discount_price'
    ),
    models.CheckConstraint(
        check=models.Q(discount_price__isnull=True) | models.Q(discount_price__lt=models.F('price')),
        name='discount_less_than_price'
    )
]
```

## Frontend Integration Points

### 1. API Endpoints Mapping

```typescript
// Frontend API configuration should match backend URLs
const API_CONFIG = {
  ENDPOINTS: {
    PETS: "/api/pets/pets",
    PET_DETAIL: (id: string) => `/api/pets/pets/${id}`,
    PET_FEATURED: "/api/pets/pets?featured=true",
    PET_SEARCH: "/api/pets/pets", // Same as PETS with search param
    BREEDS: "/api/pets/breeds",
    BREED_DETAIL: (slug: string) => `/api/pets/breeds/${slug}`,
    SPECIES: "/api/pets/species",
  },
};
```

### 2. Filter Parameter Mapping

```typescript
// Frontend filter state maps directly to backend query params
interface PetFilters {
  min_price?: number; // → min_price
  max_price?: number; // → max_price
  breed?: string; // → breed (slug)
  gender?: string; // → gender
  location?: string; // → location
  is_good_with_kids?: boolean; // → is_good_with_kids
  // ... other filters map 1:1
}
```

### 3. Response Type Mapping

```typescript
// Frontend types should match backend serializer output
interface Pet {
  id: string;
  name: string;
  breed: {
    id: string;
    name: string;
    slug: string;
    species: {
      id: string;
      name: string;
      slug: string;
    };
  };
  // ... matches PetDetailSerializer exactly
}
```

## Authentication & Permissions

### Authentication

- **JWT-based** authentication using `djoser`
- **Endpoints**: `/auth/jwt/create/`, `/auth/jwt/refresh/`, `/auth/jwt/verify/`

### Permissions

- **Read operations**: Public access (no authentication required)
- **Write operations**: Authenticated users only
- **Breeder-specific**: Only breeder can modify their own pets

## File Uploads & Media

### Media Configuration

```python
# Media files served during development
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

### Upload Paths

- **Pet photos**: `pets/images/%Y/%m/%d/`
- **Health certificates**: `pets/health_certificates/%Y/%m/%d/`
- **Registration papers**: `pets/registration/%Y/%m/%d/`
- **Pedigree documents**: `pets/pedigree/%Y/%m/%d/`
- **Breed images**: `breeds/`
- **Breeder avatars**: `breeders/avatars/%Y/%m/%d/`

## Development Setup

### Requirements

```txt
Django>=4.2.0
djangorestframework>=3.14.0
django-filter>=23.2
django-cors-headers>=4.2.0
djoser>=2.2.0
Pillow>=10.0.0
psycopg2-binary>=2.9.7
```

### Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Load sample data (if fixtures available)
python manage.py loaddata pets/fixtures/sample_data.json

# Run development server
python manage.py runserver
```

### Docker Setup

```yaml
# docker-compose.yml provides:
# - PostgreSQL database
# - Redis for caching
# - Django application
# - Nginx for static files (production)
```

## API Testing

### Sample Requests

#### Get All Pets

```bash
curl -X GET "http://localhost:8000/api/pets/pets/" \
  -H "Accept: application/json"
```

#### Filter Pets

```bash
curl -X GET "http://localhost:8000/api/pets/pets/?min_price=1000&max_price=5000&breed=golden-retriever&gender=male" \
  -H "Accept: application/json"
```

#### Search Pets

```bash
curl -X GET "http://localhost:8000/api/pets/pets/?search=golden%20retriever" \
  -H "Accept: application/json"
```

#### Get Pet Detail

```bash
curl -X GET "http://localhost:8000/api/pets/pets/123/" \
  -H "Accept: application/json"
```

## Next Steps for Frontend Integration

1. **Update Frontend Types**: Ensure TypeScript interfaces match backend serializers exactly
2. **API Endpoint URLs**: Verify frontend API_CONFIG matches backend URL patterns
3. **Filter Mapping**: Ensure frontend filter state maps correctly to backend query parameters
4. **Media URLs**: Configure frontend to handle media file URLs correctly
5. **Error Handling**: Implement proper error handling for backend API responses
6. **Authentication**: Integrate JWT authentication for protected endpoints

This backend provides a robust foundation for the PawHub pet marketplace with comprehensive filtering, search capabilities, and proper data relationships for a professional pet adoption platform.
