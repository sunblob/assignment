import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  return <Button onClick={() => router.push('/login')}>Login</Button>
}