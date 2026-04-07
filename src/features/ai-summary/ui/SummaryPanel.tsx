'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileText, Camera, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Textarea, Tabs, TabsList, TabsTrigger, TabsContent, Badge } from '@/shared/ui/components';
import { SummaryBullets } from '@/entities/summary';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

// ============================================
// SummaryInputPanel
// ============================================
interface SummaryInputPanelProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export function SummaryInputPanel({ onSubmit, isLoading }: SummaryInputPanelProps) {
  const [text, setText] = useState('');
  const [activeTab, setActiveTab] = useState('paste');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          Generate Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="paste" className="flex-1 gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              Paste Text
            </TabsTrigger>
            <TabsTrigger value="photo" className="flex-1 gap-1.5">
              <Camera className="h-3.5 w-3.5" />
              Photo
            </TabsTrigger>
            <TabsTrigger value="file" className="flex-1 gap-1.5">
              <Upload className="h-3.5 w-3.5" />
              File
            </TabsTrigger>
          </TabsList>

          <TabsContent value="paste">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your study material here..."
              rows={8}
              className="mt-3"
            />
          </TabsContent>

          <TabsContent value="photo">
            <div className="mt-3 flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-gray-200">
              <div className="text-center text-sm text-gray-400">
                <Camera className="mx-auto mb-2 h-8 w-8" />
                <p>Upload a photo of your notes</p>
                <p className="text-xs">(Coming soon)</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="file">
            <div className="mt-3 flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-gray-200">
              <div className="text-center text-sm text-gray-400">
                <Upload className="mx-auto mb-2 h-8 w-8" />
                <p>Upload a document (PDF, DOCX)</p>
                <p className="text-xs">(Coming soon)</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Button
          onClick={() => onSubmit(text)}
          disabled={!text.trim() || isLoading}
          variant="accent"
          className="mt-4 w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Summary
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

// ============================================
// SummaryResultCard
// ============================================
interface SummaryResultCardProps {
  bullets: string[];
  originalLength: number;
}

export function SummaryResultCard({ bullets, originalLength }: SummaryResultCardProps) {
  const summaryLength = bullets.join(' ').length;
  const compressionRatio = Math.round((1 - summaryLength / originalLength) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Summary</CardTitle>
            <Badge variant="accent">{compressionRatio}% compressed</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <SummaryBullets bullets={bullets} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
