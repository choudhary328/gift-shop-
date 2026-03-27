import React, { useState } from 'react';
import { Gift, Mail, Lock, User, Phone, Eye, EyeOff, LayoutDashboard, UserCheck, Chrome, Facebook, Github, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';
import { Checkbox } from './ui/checkbox';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter,
  DialogTrigger
} from './ui/dialog';

interface AuthPageProps {
  onNavigate: (page: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
  const { login, register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register State
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerMobile, setRegisterMobile] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isForgotDialogOpen, setIsForgotDialogOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoginLoading(true);
    const success = await login(loginEmail, loginPassword);
    setLoginLoading(false);

    if (success) {
      toast.success(`Login successful! Welcome back${rememberMe ? ' (Session preserved)' : ''}`);
      onNavigate('home');
    } else {
      toast.error('Invalid credentials. Try admin@giftshop.com / admin123');
    }
  };

  const loginAsAdmin = async () => {
    setLoginLoading(true);
    const success = await login('admin@giftshop.com', 'admin123');
    setLoginLoading(false);
    if (success) {
      toast.success('Logged in as Admin!');
      onNavigate('home');
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPasswordEmail) {
      toast.error('Please enter your email');
      return;
    }
    toast.success('Password reset instructions sent to your email!');
    setIsForgotDialogOpen(false);
    setForgotPasswordEmail('');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!registerName || !registerEmail || !registerMobile || !registerPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (registerPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(registerMobile)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setRegisterLoading(true);
    const success = await register(registerName, registerEmail, registerMobile, registerPassword);
    setRegisterLoading(false);

    if (success) {
      toast.success('Registration successful! Welcome to Online Gift Shop');
      onNavigate('home');
    } else {
      toast.error('User already exists with this email or mobile number');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Gift className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to Online Gift Shop</CardTitle>
          <CardDescription>
            Sign in to access exclusive gifts and offers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email or Mobile</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-email"
                      type="text"
                      placeholder="Enter email or mobile number"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember-me" 
                      checked={rememberMe} 
                      onCheckedChange={(checked) => setRememberMe(!!checked)}
                    />
                    <label
                      htmlFor="remember-me"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  
                  <Dialog open={isForgotDialogOpen} onOpenChange={setIsForgotDialogOpen}>
                    <DialogTrigger asChild>
                      <button type="button" className="text-sm font-medium text-purple-600 hover:text-purple-700">
                        Forgot password?
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reset Password</DialogTitle>
                        <DialogDescription>
                          Enter your email address and we'll send you a link to reset your password.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleForgotPassword} className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="forgot-email">Email Address</Label>
                          <Input 
                            id="forgot-email" 
                            type="email" 
                            placeholder="your@email.com" 
                            value={forgotPasswordEmail}
                            onChange={(e) => setForgotPasswordEmail(e.target.value)}
                            required
                          />
                        </div>
                        <DialogFooter>
                          <Button type="submit">Send Reset Link</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={loginLoading}
                >
                  {loginLoading ? 'Logging in...' : 'Login'}
                </Button>

                {/* Quick Access Buttons */}
                <div className="grid grid-cols-1 gap-2 mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Quick Login for Demo</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1 gap-2 border-purple-200 hover:bg-purple-50 text-purple-700 font-semibold"
                      onClick={loginAsAdmin}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Login as Admin
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1 gap-2 border-pink-200 hover:bg-pink-50 text-pink-700 font-semibold"
                      onClick={async () => {
                        setLoginLoading(true);
                        // Register a guest if not exists or just use a dummy
                        const success = await login('guest@example.com', 'guest123');
                        if (!success) {
                          // Try to register first
                          await register('Guest User', 'guest@example.com', '9876543210', 'guest123');
                          await login('guest@example.com', 'guest123');
                        }
                        setLoginLoading(false);
                        toast.success('Logged in as Guest!');
                        onNavigate('home');
                      }}
                    >
                      <UserCheck className="h-4 w-4" />
                      Login as Guest
                    </Button>
                  </div>
                </div>

                {/* Social Login Mock */}
                <div className="space-y-3 pt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <Button variant="outline" type="button" onClick={() => toast.info('Google login coming soon!')}>
                      <Chrome className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" type="button" onClick={() => toast.info('Facebook login coming soon!')}>
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" type="button" onClick={() => toast.info('Github login coming soon!')}>
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                  <div className="text-xs text-amber-800">
                    <strong>Demo Info:</strong> Admin (admin@giftshop.com / admin123) has access to the Admin Dashboard.
                  </div>
                </div>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-mobile">Mobile Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-mobile"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={registerMobile}
                      onChange={(e) => setRegisterMobile(e.target.value)}
                      maxLength={10}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create password (min 6 characters)"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-confirm-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={registerLoading}
                >
                  {registerLoading ? 'Creating Account...' : 'Register'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
