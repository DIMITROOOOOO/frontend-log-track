# Troubleshooting 500 Error on Registration

## ✅ Frontend Status
The frontend is correctly configured and sending the proper data to the backend.

## 🔍 What's Being Sent
The registration form sends the following JSON to `POST http://localhost:8000/api/auth/register`:

```json
{
  "name": "User's Full Name",
  "email": "user@example.com",
  "password": "userpassword",
  "password_confirmation": "userpassword"
}
```

## 🐛 Common Causes of 500 Error in Laravel Backend

### 1. Database Connection Issues
**Check:**
- Laravel backend `.env` file has correct database credentials
- Database server is running
- Database exists

**Laravel .env should have:**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=logtrack
DB_USERNAME=root
DB_PASSWORD=yourpassword
```

### 2. Missing Database Migrations
**Run in Laravel backend directory:**
```bash
php artisan migrate
```

### 3. Missing Users Table Columns
**Verify users table has:**
- `id`
- `name`
- `email`
- `password`
- `role` (enum or string)
- `account_status` (enum: pending, approved, rejected)
- `created_at`
- `updated_at`

### 4. CORS Issues
**In Laravel `config/cors.php`:**
```php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:5173'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
```

### 5. Missing Laravel Sanctum/Passport
**If using Sanctum, run:**
```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

### 6. AuthController Issues
**Check Laravel `app/Http/Controllers/AuthController.php`:**

```php
public function register(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|string|min:8|confirmed',
    ]);

    $user = User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => Hash::make($validated['password']),
        'role' => 'developer', // default role
        'account_status' => 'pending', // default status
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Registration successful. Awaiting admin approval.',
        'data' => [
            'user' => $user
        ]
    ], 201);
}
```

### 7. User Model Configuration
**Check `app/Models/User.php`:**

```php
protected $fillable = [
    'name',
    'email',
    'password',
    'role',
    'account_status',
];

protected $hidden = [
    'password',
    'remember_token',
];

protected $casts = [
    'email_verified_at' => 'datetime',
    'password' => 'hashed', // Laravel 10+
];
```

## 🔧 How to Debug

### Step 1: Check Laravel Logs
```bash
# In Laravel backend directory
tail -f storage/logs/laravel.log
```

### Step 2: Enable Laravel Debug Mode
**In Laravel `.env`:**
```env
APP_DEBUG=true
APP_ENV=local
```

### Step 3: Check Browser Console
Open browser DevTools (F12) and:
1. Go to Console tab - you'll see the detailed error logged
2. Go to Network tab - click the failed request to see the response

### Step 4: Test Backend Directly
Use a REST client (Postman/Insomnia) or curl:

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

### Step 5: Verify Route Exists
**In Laravel backend:**
```bash
php artisan route:list | grep register
```

Should show something like:
```
POST | api/auth/register | auth.register
```

## ✅ Quick Fixes Checklist

- [ ] Laravel backend is running (`php artisan serve`)
- [ ] Database is running and accessible
- [ ] Migrations have been run (`php artisan migrate`)
- [ ] CORS is configured to allow `http://localhost:5173`
- [ ] `.env` file has correct database credentials
- [ ] `users` table has `role` and `account_status` columns
- [ ] AuthController register method exists
- [ ] Route is registered in `routes/api.php`

## 📝 Next Steps

1. **Check Laravel logs** - The exact error will be there
2. **Look at browser console** - Frontend logs the full error response
3. **Test with Postman** - Isolate if it's a frontend or backend issue
4. **Share the Laravel error** - If still stuck, share the error from Laravel logs

---

**Frontend is working correctly ✓**  
**The issue is in the Laravel backend ⚠️**
