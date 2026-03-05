"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Store Settings</CardTitle>
            <CardDescription>Manage your store configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Store Name</Label>
              <Input className="mt-1" placeholder="My Store" />
            </div>
            <div>
              <Label>Store URL</Label>
              <Input className="mt-1" placeholder="my-store" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>Manage your subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">You are on the <strong>Free</strong> plan.</p>
            <Button variant="outline">Upgrade Plan</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
