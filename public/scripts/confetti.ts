
import confetti from 'canvas-confetti';
import type { PersonBirthdayData } from '@/types';

export function launchBirthdayConfetti(colors: string[] | null = null) {
  confetti({
    particleCount: 150,
    spread: 100,
    angle: 60,
    origin: { x: 0, y: 1 },
    colors: colors ?? undefined
  });

  confetti({
    particleCount: 150,
    spread: 100,
    angle: 120,
    origin: { x: 1, y: 1 },
    colors: colors ?? undefined
  });
}

export function launchConfettiForPerson(person: PersonBirthdayData) {
  const confettiColors = person.theme?.complementaryColor || null;
  launchBirthdayConfetti(confettiColors);
}
