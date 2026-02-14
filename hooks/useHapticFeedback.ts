export const useHapticFeedback = () => {
  const triggerHaptic = (type: 'light' | 'medium' | 'heavy') => {
    if ('vibrate' in navigator) {
      const duration = type === 'light' ? 10 : type === 'medium' ? 25 : 50;
      navigator.vibrate(duration);
    }
  };

  const triggerFlowerPick = () => triggerHaptic('light');
  const triggerFlowerSettle = () => triggerHaptic('medium');
  const triggerSendRitual = () => triggerHaptic('heavy');

  return {
    triggerFlowerPick,
    triggerFlowerSettle,
    triggerSendRitual,
    triggerHaptic
  };
};
