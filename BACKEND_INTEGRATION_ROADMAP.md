# 🔄 BACKEND INTEGRATION ROADMAP

## 🎯 **Overview**

Detailed plan for connecting your existing Django backend (`pet_pamoja-hub`) with the Next.js frontend to create a fully functional premium pet marketplace platform.

---

## 📋 **Current Backend Analysis**

### **✅ Existing Django Backend Features**

Based on the codebase analysis:

1. **Pet Management** (`pets/models.py`)

   - Pet model with breed, pricing, status, location
   - Vaccination records tracking
   - Parent lineage (father/mother) tracking
   - Breeder association

2. **User Authentication**

   - JWT authentication with RS256 signatures
   - Social login (Google, Facebook)
   - Two-factor authentication (2FA)
   - IP access control

3. **API Structure** (`pets/serializers/`)

   - `PetListSerializer` - for marketplace listings
   - `PetDetailSerializer` - detailed pet information
   - `PetCreateUpdateSerializer` - breeder pet management
   - `BreedDetailSerializer` - breed information
   - `VaccinationRecordSerializer` - health records

4. **Database Features**
   - PostgreSQL with PostGIS for location-based queries
   - Optimized indexes for price, gender, breed filtering
   - Check constraints for data validation

---

## 🔗 **Integration Architecture**

### **Frontend ↔ Backend Communication**

```typescript
// API Client Setup
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class PetHubAPI {
  // Authentication
  async login(credentials) {
    /* JWT login */
  }
  async refreshToken() {
    /* Token refresh */
  }

  // Pet Marketplace
  async getPets(filters) {
    /* Filtered pet listings */
  }
  async getPetDetail(id) {
    /* Individual pet details */
  }

  // Breeder Dashboard
  async getBreederPets() {
    /* Breeder's pet listings */
  }
  async createPet(petData) {
    /* Add new pet */
  }
  async updatePet(id, petData) {
    /* Update pet info */
  }

  // Interest/Inquiry System
  async submitInterest(petId, buyerInfo) {
    /* Express interest */
  }
  async getInquiries() {
    /* For breeders: get buyer inquiries */
  }
}
```

### **State Management Strategy**

```typescript
// Using React Query for API state management
import { useQuery, useMutation } from "@tanstack/react-query";

// Pet listings with caching and real-time updates
const usePets = (filters) => {
  return useQuery({
    queryKey: ["pets", filters],
    queryFn: () => api.getPets(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Breeder dashboard data
const useBreederPets = () => {
  return useQuery({
    queryKey: ["breeder", "pets"],
    queryFn: () => api.getBreederPets(),
    enabled: user?.isBreeder,
  });
};
```

---

## 📝 **Required API Endpoints**

### **Public Marketplace APIs**

```python
# GET /api/pets/ - Pet listings with filtering
# Query parameters:
# - breed_id, species_id, gender, min_price, max_price
# - location, featured, available_only
# - page, page_size, ordering

# GET /api/pets/{id}/ - Detailed pet information
# GET /api/breeds/ - Available breeds
# GET /api/species/ - Available species
# POST /api/interest/ - Submit buyer interest
```

### **Breeder Dashboard APIs**

```python
# Authentication required (IsBreeder permission)
# GET /api/breeder/pets/ - Breeder's pet listings
# POST /api/breeder/pets/ - Create new pet listing
# PUT /api/breeder/pets/{id}/ - Update pet information
# DELETE /api/breeder/pets/{id}/ - Remove pet listing

# GET /api/breeder/inquiries/ - Buyer inquiries for breeder's pets
# PUT /api/breeder/inquiries/{id}/ - Update inquiry status
# GET /api/breeder/analytics/ - Sales and performance data
```

### **Admin Dashboard APIs (Your Platform)**

```python
# SuperUser/Admin only
# GET /api/admin/transactions/ - All platform transactions
# GET /api/admin/breeders/ - Breeder management
# PUT /api/admin/breeders/{id}/verify/ - Verify breeder status
# GET /api/admin/analytics/ - Platform-wide analytics
```

---

## 🔧 **Implementation Steps**

### **Phase 1: Basic Integration (Week 1-2)**

#### **1. Environment Setup**

```bash
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
JWT_SECRET=your-jwt-secret
```

#### **2. API Client Implementation**

```typescript
// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or redirect to login
    }
    return Promise.reject(error);
  }
);
```

#### **3. Update Pet Listings Page**

```typescript
// app/pets/page.tsx
export default function PetsPage() {
  const [filters, setFilters] = useState({});
  const { data: pets, isLoading } = usePets(filters);

  return (
    <div>
      <PetFilters onFiltersChange={setFilters} />
      <PetGrid pets={pets} loading={isLoading} />
    </div>
  );
}
```

### **Phase 2: Breeder Dashboard (Week 3-4)**

#### **1. Authentication Flow**

```typescript
// hooks/useAuth.ts
export const useAuth = () => {
  const login = async (credentials) => {
    const response = await api.post("/auth/login/", credentials);
    const { access_token, user } = response.data;

    localStorage.setItem("auth_token", access_token);
    setUser(user);

    if (user.is_breeder) {
      router.push("/breeder/dashboard");
    } else {
      router.push("/");
    }
  };
};
```

#### **2. Breeder Dashboard Routes**

```typescript
// app/breeder/layout.tsx
export default function BreederLayout({ children }) {
  const { user } = useAuth();

  if (!user?.is_breeder) {
    return <BreederAccessDenied />;
  }

  return (
    <div className="breeder-layout">
      <BreederSidebar />
      <main>{children}</main>
    </div>
  );
}
```

#### **3. Pet Management Interface**

```typescript
// app/breeder/pets/add/page.tsx
export default function AddPetPage() {
  const createPetMutation = useMutation({
    mutationFn: (petData) => api.post("/breeder/pets/", petData),
    onSuccess: () => {
      toast.success("Pet listed successfully!");
      router.push("/breeder/pets");
    },
  });

  return <PetListingForm onSubmit={createPetMutation.mutate} />;
}
```

### **Phase 3: Interest/Inquiry System (Week 5-6)**

#### **1. Update Interest Form**

```typescript
// components/InterestForm.tsx (renamed from AdoptionForm)
export default function InterestForm({ petId, petName, onClose }) {
  const submitInterestMutation = useMutation({
    mutationFn: (interestData) =>
      api.post("/interest/", { pet_id: petId, ...interestData }),
    onSuccess: () => {
      toast.success("Interest submitted! We'll connect you with the breeder.");
      onClose();
    },
  });

  // Form handles buyer information collection
  // Submits to your platform (not directly to breeder)
}
```

#### **2. Breeder Inquiry Dashboard**

```typescript
// app/breeder/inquiries/page.tsx
export default function InquiriesPage() {
  const { data: inquiries } = useQuery({
    queryKey: ["breeder", "inquiries"],
    queryFn: () => api.get("/breeder/inquiries/"),
  });

  return (
    <div>
      {inquiries?.map((inquiry) => (
        <InquiryCard
          key={inquiry.id}
          inquiry={inquiry}
          onStatusUpdate={updateInquiryStatus}
        />
      ))}
    </div>
  );
}
```

### **Phase 4: Transaction & Commission Tracking (Week 7-8)**

#### **1. Sales Analytics**

```typescript
// app/breeder/analytics/page.tsx
export default function AnalyticsPage() {
  const { data: analytics } = useQuery({
    queryKey: ["breeder", "analytics"],
    queryFn: () => api.get("/breeder/analytics/"),
  });

  return (
    <div className="analytics-dashboard">
      <AnalyticsCards data={analytics} />
      <SalesChart data={analytics?.sales_data} />
      <CommissionBreakdown data={analytics?.commission_data} />
    </div>
  );
}
```

#### **2. Your Admin Dashboard**

```typescript
// app/admin/dashboard/page.tsx
export default function AdminDashboard() {
  const { data: platformStats } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: () => api.get("/admin/analytics/"),
  });

  return (
    <div className="admin-dashboard">
      <PlatformMetrics data={platformStats} />
      <BreederManagement />
      <TransactionMonitoring />
      <CommissionTracking />
    </div>
  );
}
```

---

## 📊 **Database Schema Updates Needed**

### **New Models to Add**

```python
# pets/models.py additions

class BuyerInterest(models.Model):
    """Buyer interest in specific pets"""
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
    buyer_name = models.CharField(max_length=100)
    buyer_phone = models.CharField(max_length=20)
    buyer_location = models.CharField(max_length=100)
    experience_level = models.CharField(max_length=50)
    interest_reason = models.TextField()
    status = models.CharField(max_length=20, choices=INTEREST_STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    contacted_at = models.DateTimeField(null=True, blank=True)

class Transaction(models.Model):
    """Track pet sales and commissions"""
    pet = models.OneToOneField(Pet, on_delete=models.CASCADE)
    buyer_interest = models.ForeignKey(BuyerInterest, on_delete=models.CASCADE)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2)
    platform_commission = models.DecimalField(max_digits=10, decimal_places=2)
    breeder_payout = models.DecimalField(max_digits=10, decimal_places=2)
    completed_at = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(max_length=20)
```

---

## 🔐 **Security & Permissions**

### **User Roles & Permissions**

```python
# users/models.py
class User(AbstractUser):
    is_breeder = models.BooleanField(default=False)
    is_verified_breeder = models.BooleanField(default=False)
    breeder_verification_date = models.DateTimeField(null=True)
    commission_rate = models.DecimalField(max_digits=5, decimal_places=2, default=15.00)

# Custom permissions
class IsVerifiedBreeder(BasePermission):
    def has_permission(self, request, view):
        return (request.user.is_authenticated and
                request.user.is_breeder and
                request.user.is_verified_breeder)
```

---

## 🚀 **Deployment Considerations**

### **Environment Configuration**

```yaml
# docker-compose.yml additions for frontend
version: "3.8"
services:
  frontend:
    build: ./frontend-pet-hub
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=https://api.yourdomain.com
    depends_on:
      - backend

  backend:
    # Your existing Django setup
    ports:
      - "8000:8000"
```

### **CORS Configuration**

```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://yourdomain.com",
]

CORS_ALLOW_CREDENTIALS = True
```

---

## 📈 **Success Metrics**

### **Key Performance Indicators**

- Pet listing conversion rate (interest → sale)
- Average time from listing to sale
- Breeder satisfaction scores
- Platform commission revenue
- User engagement metrics

This roadmap will transform your current frontend into a fully functional marketplace connected to your robust Django backend! 🎯
