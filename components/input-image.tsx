import { ControllerRenderProps } from 'react-hook-form';
import { Input } from './ui/input';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { siteSource } from '@/config/site';

export function InputImg({
  id,
  field,
  children,
  className,
  ...props
}: {
  id: string;
  field: any;
  children: React.ReactNode;
  className?: string;
}) {
  const image =
    typeof field.value[0] == 'object'
      ? URL.createObjectURL(field.value[0])
      : siteSource.getProductImg(field.value);

  return (
    <label
      className={twMerge(
        'group relative block h-24 w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border  border-gray-200',
        className,
      )}
      htmlFor={id}
      {...props}
    >
      {image ? (
        <div className="group">
          <div className="absolute inset-0 hidden flex-col items-center justify-center gap-1 text-white transition group-hover:flex group-hover:bg-gray-900/50">
            {children}
            <span className="text-xs">Upload File</span>
          </div>
          <Image
            src={image}
            alt={id}
            fill
            className="w-fill h-fill -z-10 object-cover"
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 group-hover:bg-gray-50">
          {children}
          <span className="text-xs">Upload File</span>
        </div>
      )}
      <Input
        id={id}
        type="file"
        {...field}
        value={field.value.filename}
        onChange={(event) => {
          return field.onChange(event.target.files);
        }}
        className="hidden h-24 w-full"
      />
    </label>
  );
}
