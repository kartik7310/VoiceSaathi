"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import supabase from "@/services/superbaseClinet";

export default function Page() {
    const singIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
        if (error) {
            console.log(error.message)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
            <div className="w-full max-w-md rounded-2xl bg-background shadow-lg p-8 flex flex-col items-center text-center">
                {/* Image */}
                <h2 className="text-2xl font-bold text-slate-500">VoiceSaathi</h2>
                <div className="mb-6">
                    <Image
                        src="/login.webp"
                        alt="VoiceSaathi login illustration"
                        width={320}
                        height={320}
                        priority
                        className="mx-auto"
                    />
                </div>

                {/* Text Section */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Welcome to VoiceSaathi
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Practice interviews with AI voice guidance.
                        Sign in to continue.
                    </p>
                </div>

                {/* Button */}
                <Button className="w-full mt-6 h-11 text-base font-medium" onClick={singIn}>
                    Sign in with Google
                </Button>

            </div>
        </div>
    );
}