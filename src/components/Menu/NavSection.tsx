import { Box, Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface NavSectionProps {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children }: NavSectionProps) {
  return (
    <Box>
      <Text fontWeight="bold" color="gray.500" fontSize="small">
        {title}
      </Text>
      <Stack spacing="4" mt="5" align="stretch">
        {children}
      </Stack>
    </Box>
  );
}
