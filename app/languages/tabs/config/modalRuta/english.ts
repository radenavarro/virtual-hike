import { TemplateModalRuta } from "@/app/types";

export const english:TemplateModalRuta = {
    validationMessages: {
        rutaAdded: "Path added",
        rutaEdited: "All path modifications have been applied",
        splitAdded: "Split added",
        splitEdited: "The split has been modified",
        splitRemoved: "Split removed. Save changes in order to apply them",
        spriteChanged: "Sprite changed. Save changes in order to apply them",
    },
    validationErrorMessages: {
        splitErrorTitle: "Split error",
        noName: "There is no name",
        noKm: "There is no km",
        noDuration: "There is no duration",
        kmBelowZero: "The km must be greater than 0",
        durationZeroOrLess: "The duration must be greater than 0",
        nameEmpty: "The name cannot be empty",
        nameInSplits: "The name cannot be in the splits",
        kmInSplits: "The km cannot be in the splits",
        overlappingSplits: "There is overlapping in the splits: ",
    }
}