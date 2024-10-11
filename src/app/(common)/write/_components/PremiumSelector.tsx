import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PremiumSelectorProps {
  isPremium: boolean;
  onChange: (value: boolean) => void;
}

export default function PremiumSelector({ isPremium, onChange }: PremiumSelectorProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-gray-300">Is your content premium?</label>
      <Select value={isPremium ? "Yes" : "No"} onValueChange={(value) => onChange(value === "Yes")}>
        <SelectTrigger className=" text-white">
          <SelectValue placeholder="Is your content premium?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Yes">Yes</SelectItem>
          <SelectItem value="No">No</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}