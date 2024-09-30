import { TemplateModalRuta } from "@/app/types";

export const english:TemplateModalRuta = {
    validationMessages: {
        rutaAdded: "Route added",
        rutaEdited: "The route has been modified",
        splitAdded: "Split added",
        splitEdited: "The split has been modified",
        splitRemoved: "Split removed. Save changes in order to apply them",
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