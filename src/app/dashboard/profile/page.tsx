"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  User, Mail, Save, Shield, Bell, Palette, Globe, Calendar,
  Camera, Check, X, Phone, MapPin, Link as LinkIcon,
} from "lucide-react"

export default function ProfilePage() {
  return (
    <>
      {/* Cover */}
      <div className="relative h-48 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Avatar section - overlaps cover */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 -mt-16 mb-8">
          <div className="relative group">
            <Avatar className="h-28 w-28 ring-4 ring-background shadow-xl">
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-3xl font-bold">
                JD
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-1 right-1 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 min-w-0 pb-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">John Doe</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                  <Mail className="h-3.5 w-3.5" />
                  john@example.com
                </div>
              </div>
              <Badge variant="outline" className="sm:ml-auto gap-1.5 px-3 py-1 text-xs w-fit">
                <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" /> Verified
              </Badge>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="personal" className="space-y-6 pb-10">
          <TabsList className="bg-muted/60 p-1 rounded-xl">
            <TabsTrigger value="personal" className="gap-2 rounded-lg data-[state=active]:shadow-sm">
              <User className="h-4 w-4" /> Personal
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2 rounded-lg data-[state=active]:shadow-sm">
              <Shield className="h-4 w-4" /> Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2 rounded-lg data-[state=active]:shadow-sm">
              <Bell className="h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2 rounded-lg data-[state=active]:shadow-sm">
              <Palette className="h-4 w-4" /> Appearance
            </TabsTrigger>
          </TabsList>

          {/* Personal Tab */}
          <TabsContent value="personal" className="space-y-6 mt-0 pt-6">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">First Name</label>
                    <Input defaultValue="John" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input defaultValue="Doe" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input defaultValue="john@example.com" type="email" className="pl-9" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input defaultValue="+1 (555) 123-4567" className="pl-9" />
                    </div>
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-sm font-medium">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input defaultValue="San Francisco, CA, USA" className="pl-9" />
                    </div>
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-sm font-medium">Bio</label>
                    <Textarea
                      defaultValue="Full-stack developer and digital asset creator. Passionate about building beautiful, functional web experiences."
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button className="gap-2 shadow-sm">
                    <Save className="h-4 w-4" /> Save Changes
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <X className="h-4 w-4" /> Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Social Links</CardTitle>
                <CardDescription>Connect your social profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Website</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input defaultValue="https://johndoe.dev" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">GitHub</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input defaultValue="https://github.com/johndoe" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Twitter</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input defaultValue="https://twitter.com/johndoe" className="pl-9" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6 mt-0 pt-6">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Change Password</CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Current Password</label>
                  <Input type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">New Password</label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
                <Button className="gap-2 mt-2 shadow-sm">
                  <Shield className="h-4 w-4" /> Update Password
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Enable 2FA</p>
                  <p className="text-xs text-muted-foreground">Protect your account with an authenticator app</p>
                </div>
                <Button variant="outline" className="shadow-sm">Enable</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6 mt-0 pt-6">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Notification Preferences</CardTitle>
                <CardDescription>Choose what updates you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  { title: "New messages", desc: "Get notified when someone sends you a message" },
                  { title: "Item sold", desc: "Receive a notification when your item is purchased" },
                  { title: "New followers", desc: "Know when someone follows your profile" },
                  { title: "Weekly digest", desc: "Get a weekly summary of your account activity" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <div className="h-5 w-10 rounded-full bg-primary cursor-pointer relative">
                      <div className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-background shadow-sm" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6 mt-0 pt-6">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Theme</CardTitle>
                <CardDescription>Customize how the dashboard looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {["Light", "Dark", "System"].map((mode) => (
                    <button
                      key={mode}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        mode === "Dark"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-muted-foreground/30"
                      }`}
                    >
                      <div className={`h-16 w-full rounded-lg ${mode === "Light" ? "bg-white border" : mode === "Dark" ? "bg-zinc-900" : "bg-gradient-to-r from-white to-zinc-900 border"}`} />
                      <span className="text-xs font-medium">{mode}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
