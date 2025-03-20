import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share2, Copy, Twitter, Facebook, Mail, Link } from "lucide-react";
import { motion } from "framer-motion";

interface SocialShareProps {
  title: string;
  description?: string;
  url?: string;
  image?: string;
  children?: React.ReactNode;
}

export function SocialShare({
  title,
  description = "",
  url = window.location.href,
  image = "",
  children,
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("social");

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(`${title}\n${description}`);
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank");
  };

  const shareToFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank");
  };

  const shareByEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${description}\n\n${url}`);
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-teal-200 text-teal-700 hover:bg-teal-50"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>
            Share this {title.toLowerCase()} with others
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="social"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="link">Copy Link</TabsTrigger>
          </TabsList>

          <TabsContent value="social" className="mt-4">
            <div className="grid grid-cols-3 gap-3">
              <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col gap-1 border-blue-200 hover:bg-blue-50"
                  onClick={shareToTwitter}
                >
                  <Twitter className="h-6 w-6 text-blue-500" />
                  <span className="text-xs text-gray-700">Twitter</span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col gap-1 border-blue-200 hover:bg-blue-50"
                  onClick={shareToFacebook}
                >
                  <Facebook className="h-6 w-6 text-blue-600" />
                  <span className="text-xs text-gray-700">Facebook</span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col gap-1 border-amber-200 hover:bg-amber-50"
                  onClick={shareByEmail}
                >
                  <Mail className="h-6 w-6 text-amber-500" />
                  <span className="text-xs text-gray-700">Email</span>
                </Button>
              </motion.div>
            </div>

            {image && (
              <div className="mt-4 rounded-md border p-2">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-auto rounded"
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="link" className="mt-4">
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Input id="link" defaultValue={url} readOnly className="h-9" />
              </div>
              <Button
                size="sm"
                className="px-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white"
                onClick={handleCopyLink}
              >
                <span className="sr-only">Copy</span>
                {copied ? (
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="text-xs"
                  >
                    Copied!
                  </motion.div>
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="sm:justify-start">
          <DialogDescription className="text-xs text-gray-500">
            This will share the {title.toLowerCase()} with others, allowing them
            to view it.
          </DialogDescription>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
