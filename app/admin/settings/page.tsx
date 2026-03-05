"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useSettings } from "@/components/language-provider";

export default function SettingsPage() {
  const { language, setLanguage, themeColor, setThemeColor } = useSettings();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="inline-block text-xl justify-self-start font-bold tracking-tight">
          Settings
        </h2>
        <p className="text-sm font-medium">
          Manage your app settings and preferences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Localization & Preferences */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>
              Manage your language and display preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 flex-1">
            <div className="space-y-3">
              <Label>Localization</Label>
              <Select value={language} onValueChange={(val: any) => setLanguage(val)}>
                <SelectTrigger className="w-full" dir={language === "arabic" ? "rtl" : "ltr"}>
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent dir={language === "arabic" ? "rtl" : "ltr"}>
                  <SelectItem value="english">English (US)</SelectItem>
                  <SelectItem value="arabic">Arabic (العربية)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Select the language used throughout the application.
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Theme Color</Label>
              <RadioGroup
                value={themeColor}
                onValueChange={setThemeColor}
                className="flex gap-4"
              >
                {[
                  {
                    id: "blue",
                    colorClass: "bg-blue-600",
                    activeBorder: "peer-data-[state=checked]:border-blue-600",
                  },
                  {
                    id: "orange",
                    colorClass: "bg-orange-500",
                    activeBorder: "peer-data-[state=checked]:border-orange-500",
                  },
                  {
                    id: "red",
                    colorClass: "bg-red-500",
                    activeBorder: "peer-data-[state=checked]:border-red-500",
                  },
                  {
                    id: "green",
                    colorClass: "bg-green-500",
                    activeBorder: "peer-data-[state=checked]:border-green-500",
                  },
                  {
                    id: "purple",
                    colorClass: "bg-purple-500",
                    activeBorder: "peer-data-[state=checked]:border-purple-500",
                  },
                ].map((t) => (
                  <div key={t.id} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={t.id}
                      id={t.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={t.id}
                      className={`h-10 w-10 rounded-md border-2 border-muted bg-transparent hover:bg-accent hover:text-accent-foreground ${t.activeBorder} peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 flex items-center justify-center cursor-pointer`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-sm ${t.colorClass}`}
                      />
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <p className="text-xs text-muted-foreground">
                Choose a base theme color for your workspace.
              </p>
            </div>
          </CardContent>
          <CardFooter className="mt-auto border-t pt-6  rounded-b-xl">
            <Button>Save Preferences</Button>
          </CardFooter>
        </Card>

        {/* Profile Settings */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Update your personal details here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 flex-1">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                defaultValue="Admin User"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                defaultValue="admin@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" placeholder="Role or short bio" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between mt-auto border-t pt-6  rounded-b-xl">
            <Button
              variant="outline"
              className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
            >
              Delete Account
            </Button>
            <Button>Update Profile</Button>
          </CardFooter>
        </Card>

        {/* Notifications */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Choose what updates you want to receive.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="marketing">Marketing emails</Label>
                <span className="text-sm text-muted-foreground">
                  Receive emails about new products, features, and more.
                </span>
              </div>
              <Switch id="marketing" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="security">Security emails</Label>
                <span className="text-sm text-muted-foreground">
                  Receive emails about your account security.
                </span>
              </div>
              <Switch id="security" defaultChecked disabled />
            </div>
            <Separator />
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="updates">System updates</Label>
                <span className="text-sm text-muted-foreground">
                  Get notified about system maintenance and updates.
                </span>
              </div>
              <Switch id="updates" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
