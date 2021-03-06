import { Stack } from '@chakra-ui/react';
import {
  RiDashboardLine,
  RiInputMethodLine,
  RiMoneyDollarBoxLine,
  RiFile2Line,
} from 'react-icons/ri';
import { useAuth } from '../../hooks/useAuth';

import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav() {
  const { user } = useAuth();

  return (
    <Stack spacing="8" align="flex-start">
      <NavSection title="PACIENTES">
        <NavLink icon={RiInputMethodLine} href="/case">
          Novo caso
        </NavLink>
        <NavLink icon={RiDashboardLine} href="/cases-table">
          Listar casos
        </NavLink>
      </NavSection>
      <NavSection title="VALORES">
        <NavLink icon={RiMoneyDollarBoxLine} href="/values">
          Consultar
        </NavLink>
      </NavSection>
      <NavSection title="ARQUIVOS ÚTEIS">
        <NavLink icon={RiFile2Line} href="/files">
          Arquivos
        </NavLink>
      </NavSection>
      <NavSection hidden={user.type !== 'Admin'} title="USUÁRIOS">
        <NavLink icon={RiDashboardLine} href="/users-table">
          Tabela de usuários
        </NavLink>
      </NavSection>
    </Stack>
  );
}
