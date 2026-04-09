export const validTransitions = {
  pending: ["accepted"],
  accepted: ["diagnosing"],
  diagnosing: ["repairing"],
  repairing: ["testing"],
  testing: ["completed"],
  completed: [],
};

export const canTransition = (current, next) => {
  return validTransitions[current]?.includes(next);
};