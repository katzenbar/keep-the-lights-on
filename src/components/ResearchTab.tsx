import { Button, Heading, StackItem, VStack, Text } from "@chakra-ui/react";
import React from "react";
import { researcherTypes, researcherDescriptions, canPurchaseResearcher, ResearcherType } from "../lib/Researchers";
import { canPurchaseResearchProject, hasRequiredResearchProjects, researchProjects } from "../lib/ResearchProjects";
import { compare, multiply, serializeNumber, formatStandardNumber, formatMoney } from "../lib/SerializeableBigNumber";
import {
  selectCashAvailable,
  selectMaxCashAvailable,
  buyResearcher,
  selectResearchers,
  purchaseResearchProject,
  selectIdeasAvailable,
  selectMaxIdeasAvailable,
  selectPurchasedResearchProjects,
} from "../store/gameSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const minimumResearcherCost = multiply(
  serializeNumber(0.75),
  researcherDescriptions[ResearcherType.juniorResearchAssistant].baseCost,
);

type Props = {};

const ResearchTab: React.FunctionComponent<Props> = (props) => {
  const dispatch = useAppDispatch();

  const cashAvailable = useAppSelector(selectCashAvailable);
  const maxCashAvailable = useAppSelector(selectMaxCashAvailable);

  const ideasAvailable = useAppSelector(selectIdeasAvailable);
  const maxIdeasAvailable = useAppSelector(selectMaxIdeasAvailable);

  const researchers = useAppSelector(selectResearchers);
  const purchasedResearchProjects = useAppSelector(selectPurchasedResearchProjects);

  if (compare(maxCashAvailable, minimumResearcherCost) !== 1) {
    return (
      <Text fontStyle="italic" color="gray.400">
        If you collect enough money, maybe you can hire staff to research improvements.
      </Text>
    );
  }

  return (
    <VStack align="stretch" spacing={8}>
      <StackItem>
        <Heading as="h2" size="md" pb={4}>
          Researchers
        </Heading>
        <VStack align="stretch" spacing={4}>
          {researcherTypes.map((researcherType) => {
            const researcher = researchers[researcherType];
            const researcherDescription = researcherDescriptions[researcherType];

            if (compare(maxCashAvailable, multiply(serializeNumber(0.75), researcherDescription.baseCost)) === -1) {
              return null;
            }

            return (
              <StackItem key={researcherType}>
                <Heading as="h3" size="sm" pb={1}>
                  {researcherDescription.name} x {researcher.numberEmployed}
                </Heading>
                <Text pb={2} fontSize="sm" color="gray.400">
                  Generates {formatStandardNumber(researcher.ideasPerDay)} ideas per day --{" "}
                  {researcherDescription.colorText}
                </Text>
                <Button
                  onClick={() => dispatch(buyResearcher(researcherType))}
                  disabled={!canPurchaseResearcher(cashAvailable, researcher)}
                >
                  Hire for ${formatMoney(researcher.nextPurchaseCost, true)}
                </Button>
              </StackItem>
            );
          })}
        </VStack>
      </StackItem>

      <StackItem>
        <Heading as="h2" size="md" pb={4}>
          Projects
        </Heading>
        {maxIdeasAvailable === serializeNumber(0) ? (
          <Text fontStyle="italic" color="gray.400">
            Hire some researchers, and they might have an idea or two of how to improve your power grid.
          </Text>
        ) : (
          <VStack align="stretch" spacing={4}>
            {researchProjects.map((researchProject) => {
              if (purchasedResearchProjects.includes(researchProject.identifier)) {
                return null;
              }

              if (
                compare(maxIdeasAvailable, multiply(serializeNumber(0.75), researchProject.cost)) === -1 ||
                !hasRequiredResearchProjects(researchProject, purchasedResearchProjects)
              ) {
                return null;
              }

              return (
                <StackItem key={researchProject.identifier}>
                  <Heading as="h3" size="sm" pb={1}>
                    {researchProject.name}
                  </Heading>
                  <Text pb={2} fontSize="sm" color="gray.400">
                    {researchProject.description}
                  </Text>
                  <Button
                    onClick={() => dispatch(purchaseResearchProject(researchProject.identifier))}
                    disabled={!canPurchaseResearchProject(ideasAvailable, researchProject, purchasedResearchProjects)}
                  >
                    Purchase for {formatStandardNumber(researchProject.cost)} ideas
                  </Button>
                </StackItem>
              );
            })}
          </VStack>
        )}
      </StackItem>
    </VStack>
  );
};

export default ResearchTab;
