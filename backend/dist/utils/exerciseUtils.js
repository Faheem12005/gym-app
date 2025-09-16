"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupByFirstLetter = void 0;
const groupByFirstLetter = (exercises) => {
    const sections = [];
    for (const exercise of exercises) {
        const letter = exercise.name[0].toUpperCase();
        const existingSection = sections.find(section => section.title === letter);
        if (existingSection) {
            existingSection.data.push(exercise);
        }
        else {
            sections.push({ title: letter, data: [exercise] });
        }
    }
    return sections.sort((a, b) => a.title.localeCompare(b.title));
};
exports.groupByFirstLetter = groupByFirstLetter;
