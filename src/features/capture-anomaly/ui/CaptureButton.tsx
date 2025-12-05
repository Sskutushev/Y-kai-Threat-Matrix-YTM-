import { Button } from '@/shared/ui/Button/Button';
import { Spinner } from '@/shared/ui/Spinner/Spinner';
import { useCaptureMutation } from '../model/use-capture';

interface CaptureButtonProps {
  anomalyId: string;
  disabled?: boolean;
}

export const CaptureButton = ({ anomalyId, disabled }: CaptureButtonProps) => {
  const { mutate, isPending } = useCaptureMutation();

  const handleClick = () => {
    mutate({ id: anomalyId });
  };

  return (
    <Button
      variant="danger"
      onClick={handleClick}
      disabled={disabled || isPending}
      fullWidth
    >
      {isPending ? (
        <>
          <Spinner size="sm" />
          <span>Capturing...</span>
        </>
      ) : (
        'Capture Yōkai'
      )}
    </Button>
  );
};