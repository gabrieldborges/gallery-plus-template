import React from "react";
import ImageFilePreview from "../../../components/image-file-preview";
import InputCheckbox from "../../../components/input-checkbox";
import { tv } from "tailwind-variants";

export const photoImageSelectableVariants = tv({
  base: `
    cursor-pointer relative rounded-lg my-1
  `,
  variants: {
    select: {
      true: "outline-2 outline-accent-brand",
    },
  },
});

interface PhotoImageSelectableProps extends React.ComponentProps<
  typeof ImageFilePreview
> {
  selected?: boolean;
  onSelectedImage?: (selected: boolean) => void;
}

export default function PhotoImageSelectable({
  selected,
  onSelectedImage,
  className,
  ...props
}: PhotoImageSelectableProps) {
  const [isSelected, setIsSelected] = React.useState(selected);

  function handleSelect() {
    const newValue = !isSelected;
    setIsSelected(newValue);
    onSelectedImage?.(newValue);
  }

  return (
    <label
      className={photoImageSelectableVariants({
        select: isSelected,
      })}
    >
      <InputCheckbox
        size="sm"
        onChange={handleSelect}
        defaultChecked={isSelected}
        className="absolute top-1 left-1"
      />
      <ImageFilePreview className={className}{...props} />
    </label>
  );
}
