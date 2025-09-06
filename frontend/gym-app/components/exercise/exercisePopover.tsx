import { Button, ButtonText } from "@/components/ui/button";
import {
  Popover,
  PopoverBackdrop,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
} from "@/components/ui/popover";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";

interface Props {
    exerciseId: string;
    removeSet: (exerciseId: string) => void;
}
const ExercisePopover = ({ exerciseId, removeSet }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Popover
      isOpen={isOpen}
      onClose={handleClose}
      onOpen={handleOpen}
      trigger={(triggerProps) => {
        return (
          <Button {...triggerProps} size="sm">
            <Entypo name="dots-three-vertical" size={14} color="black" />
          </Button>
        );
      }}
      placement="bottom right"
      shouldFlip={true}
      crossOffset={10}
    >
        <PopoverBackdrop/>
        <PopoverContent
          className="bg-slate-800">
            <PopoverArrow className="bg-slate-800" />
            <PopoverBody>
                <Button className="active:bg-slate-600">
                    <ButtonText className="text-white font-normal text-sm">Reduce Sets</ButtonText>
                </Button>
                <Button onPress={() => removeSet(exerciseId)} className="active:bg-slate-600">
                    <ButtonText className="text-white font-normal text-sm">Remove exercise</ButtonText>
                </Button>
                <Button className="active:bg-slate-600">
                    <ButtonText className="text-white font-normal text-sm">Rest Timer</ButtonText>
                </Button>
                <Button className="active:bg-slate-600">
                  <ButtonText className="text-white font-normal text-sm">Suggest Weights</ButtonText>
                </Button>
                <Button className="active:bg-slate-600">
                  <ButtonText className="text-white font-normal text-sm">Suggest Sets</ButtonText>
                </Button>
            </PopoverBody>
        </PopoverContent>
    </Popover>
  );
};

export default ExercisePopover;
