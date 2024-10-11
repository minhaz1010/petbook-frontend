import React from 'react';
import { Input } from '@/components/ui/input';

interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TitleInput({ value, onChange }: TitleInputProps) {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter post title"
      className="mb-4 text-xl px-3 text-white placeholder-gray-400"
    />
  );
}