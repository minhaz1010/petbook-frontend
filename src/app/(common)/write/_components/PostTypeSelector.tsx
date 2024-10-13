import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PostTypeSelectorProps {
  postType: string;
  petType: string;
  onPostTypeChange: (value: string) => void;
  onPetTypeChange: (value: string) => void;
}

export default function PostTypeSelector({ postType, petType, onPostTypeChange, onPetTypeChange }: PostTypeSelectorProps) {
  return (
    <div className='flex    gap-20'>
      <div className=' w-full block md:inline'>
        <label className="block mb-2 text-gray-300">Post Type</label>
        <Select value={postType} onValueChange={onPostTypeChange}>
          <SelectTrigger className="w-full text-white">
            <SelectValue placeholder="Select post type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="STORY">Story</SelectItem>
            <SelectItem value="TIP">Tip</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className=' w-full block md:inline' >
        <label className="block mb-2 text-gray-300">Pet Type</label>
        <Select value={petType} onValueChange={onPetTypeChange}>
          <SelectTrigger className="w-full text-white">
            <SelectValue placeholder="Select a pet type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Cat">Cat</SelectItem>
            <SelectItem value="Dog">Dog</SelectItem>
            <SelectItem value="Bird">Bird</SelectItem>
            <SelectItem value="Rabbit">Rabbit</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}