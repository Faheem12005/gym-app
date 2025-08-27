import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heading } from '@/components/ui/heading';

type CustomHeaderProps = {
    heading: string;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({ heading }) => (
    <SafeAreaView className='px-4 pt-2'>
        <Heading className='font-bold text-4xl'>{heading}</Heading>
    </SafeAreaView>
);


export default CustomHeader;