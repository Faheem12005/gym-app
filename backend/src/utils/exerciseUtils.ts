export const groupByFirstLetter = (exercises: { name: string }[]) => {
  const sections: { title: string, data: typeof exercises }[] = [];

  for (const exercise of exercises) {
    const letter = exercise.name[0].toUpperCase();

    const existingSection = sections.find(section => section.title === letter);
    if (existingSection) {
      existingSection.data.push(exercise);
    } else {
      sections.push({ title: letter, data: [exercise] });
    }
  }

  return sections.sort((a, b) => a.title.localeCompare(b.title));
}
