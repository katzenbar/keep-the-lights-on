import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import AchievementsTab from "../components/AchievementsTab";
import GenerationTab from "../components/GenerationTab";
import ResearchTab from "../components/ResearchTab";
import SettingsTab from "../components/SettingsTab";

type Props = {};

const ContentPane: React.FunctionComponent<Props> = (props) => {
  return (
    <Tabs>
      <TabList>
        <Tab>Generation</Tab>
        <Tab>Research</Tab>
        <Tab>Achievements</Tab>
        <Tab>Settings</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <GenerationTab />
        </TabPanel>
        <TabPanel>
          <ResearchTab />
        </TabPanel>
        <TabPanel>
          <AchievementsTab />
        </TabPanel>
        <TabPanel>
          <SettingsTab />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ContentPane;
