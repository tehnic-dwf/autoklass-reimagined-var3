import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { useId } from "react";

type Option = { value: string; label: string; count?: number };
type Group = { label: string; options: Option[] };

export function ClassicSelect({
  label,
  value,
  placeholder,
  options,
  groups,
  onChange,
  disabled = false,
  className = "",
}: {
  label: string;
  value: string;
  placeholder: string;
  options?: Option[];
  groups?: Group[];
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}) {
  const id = useId();
  const selectedLabel =
    [...(options || []), ...(groups || []).flatMap((group) => group.options)].find(
      (option) => option.value === value,
    )?.label || placeholder;
  const renderOption = (option: Option) => (
    <Select.Item key={option.value} value={option.value} className="ak-classic-option">
      <Select.ItemText>{option.label}</Select.ItemText>
      {option.count !== undefined && (
        <span className="ak-classic-count" aria-label={`${option.count} mașini`}>
          {option.count}
        </span>
      )}
      <Select.ItemIndicator>
        <Check size={16} aria-hidden />
      </Select.ItemIndicator>
    </Select.Item>
  );

  return (
    <div className={`v3-field ak-classic-field ${className}`}>
      <label htmlFor={id}>{label}</label>
      <Select.Root
        value={value || "__all__"}
        onValueChange={(next) => onChange(next === "__all__" ? "" : next)}
        disabled={disabled}
      >
        <Select.Trigger id={id} className="ak-classic-trigger" aria-label={label}>
          <Select.Value>{selectedLabel}</Select.Value>
          <Select.Icon>
            <ChevronDown size={18} aria-hidden />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="ak-classic-content"
            position="popper"
            side="bottom"
            avoidCollisions
            sideOffset={4}
            collisionPadding={12}
          >
            <Select.Viewport className="ak-classic-viewport">
              <Select.Item value="__all__" className="ak-classic-option">
                <Select.ItemText>{placeholder}</Select.ItemText>
                <Select.ItemIndicator>
                  <Check size={16} aria-hidden />
                </Select.ItemIndicator>
              </Select.Item>
              {groups
                ? groups.map((group) => (
                    <Select.Group key={group.label}>
                      <Select.Label className="ak-classic-group">{group.label}</Select.Label>
                      {group.options.map(renderOption)}
                    </Select.Group>
                  ))
                : options?.map(renderOption)}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
