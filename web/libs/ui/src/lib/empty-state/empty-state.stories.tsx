import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./empty-state";
import { Button } from "../button/button";
import {
  IconUpload,
  IconSearch,
  IconInbox,
  IconLsLabeling,
  IconLsReview,
  IconCheck,
  IconCloudProviderS3,
  IconCloudProviderGCS,
  IconCloudProviderAzure,
  IconCloudProviderRedis,
  IconExternal,
  IconRelationLink,
} from "@humansignal/icons";
import { Typography } from "../typography/typography";
import { Tooltip } from "../Tooltip/Tooltip";
import i18n from "i18next";

const t = (key: string) => i18n.t(`stories.emptyState.${key}`);

const meta: Meta<typeof EmptyState> = {
  component: EmptyState,
  title: "UI/Empty State",
  parameters: {
    docs: {
      description: {
        component: t("componentDescription"),
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["large", "medium", "small"],
      description: t("sizeDescription"),
    },
    variant: {
      control: "select",
      options: ["primary", "neutral", "negative", "positive", "warning", "gradient"],
      description: t("variantDescription"),
    },
    icon: {
      control: false,
      description: t("iconDescription"),
    },

    title: {
      control: "text",
      description: t("titleDescription"),
    },
    description: {
      control: "text",
      description: t("descriptionDescription"),
    },
    actions: {
      control: false,
      description: t("actionsDescription"),
    },
    additionalContent: {
      control: false,
      description: t("additionalContentDescription"),
    },
    footer: {
      control: false,
      description: t("footerDescription"),
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

// Basic Stories
export const Default: Story = {
  args: {
    size: "medium",
    variant: "primary",
    icon: <IconInbox />,
    title: t("defaultTitle"),
    description: t("defaultDescription"),
    footer: (
      <Typography variant="label" size="small" className="text-primary-link">
        <a href="/docs/labeling-interface" className="inline-flex items-center gap-1 hover:underline">
          {t("learnMore")}
          <IconExternal width={16} height={16} />
        </a>
      </Typography>
    ),
  },
};

export const WithSingleAction: Story = {
  args: {
    size: "medium",
    variant: "primary",
    icon: <IconUpload />,
    title: t("uploadDataTitle"),
    description: t("uploadDataDescription"),
    actions: (
      <Button variant="primary" look="filled">
        {t("uploadFile")}
      </Button>
    ),
  },
};

export const WithMultipleActions: Story = {
  args: {
    size: "medium",
    variant: "primary",
    icon: <IconUpload />,
    title: t("importDataTitle"),
    description: t("importDataDescription"),
    actions: (
      <>
        {/* <Button variant="primary" look="filled" className="flex-1">
          Connect Cloud Storage
        </Button> */}
        <Button variant="primary" look="outlined" className="flex-1">
          {t("uploadFiles")}
        </Button>
      </>
    ),
  },
};

// Size Comparison Stories
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-semibold mb-4">{t("headingLarge")}</h3>
        <div className="border border-neutral-border rounded-lg p-4 h-96">
          <EmptyState
            size="large"
            variant="primary"
            icon={<IconUpload />}
            title={t("importProjectTitle")}
            description={t("importDataDescription")}
            actions={
              <>
                {/* <Button variant="primary" look="filled" className="flex-1">
                  Connect Cloud Storage
                </Button> */}
                <Button variant="primary" look="outlined" className="flex-1">
                  {t("importAction")}
                </Button>
              </>
            }
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">{t("headingMedium")}</h3>
        <div className="border border-neutral-border rounded-lg p-4 h-64">
          <EmptyState
            size="medium"
            variant="primary"
            icon={<IconUpload />}
            title={t("createProjectTitle")}
            description={t("createProjectDescription")}
            actions={
              <Button variant="primary" look="filled">
                {t("createProject")}
              </Button>
            }
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">{t("headingSmall")}</h3>
        <div className="border border-neutral-border rounded-lg p-4 h-48">
          <EmptyState
            size="small"
            variant="primary"
            icon={<IconLsLabeling />}
            title={t("labeledRegionsTitle")}
            description={t("labeledRegionsDescription")}
            footer={
              <Typography variant="label" size="small" className="text-primary-link">
                <a href="/docs/labeling-interface" className="inline-flex items-center gap-1 hover:underline">
                  {t("learnMore")}
                  <IconExternal width={16} height={16} />
                </a>
              </Typography>
            }
          />
        </div>
      </div>
    </div>
  ),
};

// Color Variant Stories
export const ColorVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8">
      <div className="border border-neutral-border rounded-lg p-4 h-64">
        <EmptyState
          size="medium"
          variant="primary"
          icon={<IconUpload />}
          title={t("primaryVariant")}
          description={t("primaryDescription")}
        />
      </div>

      <div className="border border-neutral-border rounded-lg p-4 h-64">
        <EmptyState
          size="medium"
          variant="neutral"
          icon={<IconInbox />}
          title={t("neutralVariant")}
          description={t("neutralDescription")}
        />
      </div>

      <div className="border border-neutral-border rounded-lg p-4 h-64">
        <EmptyState
          size="medium"
          variant="negative"
          icon={<IconSearch />}
          title={t("negativeVariant")}
          description={t("negativeDescription")}
        />
      </div>

      <div className="border border-neutral-border rounded-lg p-4 h-64">
        <EmptyState
          size="medium"
          variant="positive"
          icon={<IconCheck />}
          title={t("positiveVariant")}
          description={t("positiveDescription")}
        />
      </div>

      <div className="border border-neutral-border rounded-lg p-4 h-64">
        <EmptyState
          size="medium"
          variant="warning"
          icon={<IconSearch />}
          title={t("warningVariant")}
          description={t("warningDescription")}
        />
      </div>

      <div className="border border-neutral-border rounded-lg p-4 h-64">
        <EmptyState
          size="medium"
          variant="gradient"
          icon={<IconLsLabeling />}
          title={t("gradientVariant")}
          description={t("gradientDescription")}
        />
      </div>
    </div>
  ),
};

// Data Manager Inspired Stories
export const DataManagerImport: Story = {
  args: {
    size: "large",
    variant: "primary",
    icon: <IconUpload />,
    title: t("importProjectTitle"),
    description: t("importDataDescription"),
    // additionalContent: (
    //   <div className="flex items-center justify-center gap-base">
    //     <Tooltip title="Amazon S3">
    //       <div className="flex items-center justify-center p-2">
    //         <IconCloudProviderS3 width={32} height={32} className="text-neutral-content-subtler" />
    //       </div>
    //     </Tooltip>
    //     <Tooltip title="Google Cloud Storage">
    //       <div className="flex items-center justify-center p-2">
    //         <IconCloudProviderGCS width={32} height={32} className="text-neutral-content-subtler" />
    //       </div>
    //     </Tooltip>
    //     <Tooltip title="Azure Blob Storage">
    //       <div className="flex items-center justify-center p-2">
    //         <IconCloudProviderAzure width={32} height={32} className="text-neutral-content-subtler" />
    //       </div>
    //     </Tooltip>
    //     <Tooltip title="Redis Storage">
    //       <div className="flex items-center justify-center p-2">
    //         <IconCloudProviderRedis width={32} height={32} className="text-neutral-content-subtler" />
    //       </div>
    //     </Tooltip>
    //   </div>
    // ),
    actions: (
      <>
        {/* <Button variant="primary" look="filled" className="flex-1">
          Connect Cloud Storage
        </Button> */}
        <Button variant="primary" look="outlined" className="flex-1">
          {t("importAction")}
        </Button>
      </>
    ),
    // footer: (
    //   <Typography variant="label" size="small" className="text-primary-link hover:underline">
    //     <a href="/docs/import-data" className="inline-flex items-center gap-1">
    //       See docs on importing data
    //       <IconExternal width={20} height={20} />
    //     </a>
    //   </Typography>
    // ),
  },
};

export const AnnotatorLabelingState: Story = {
  args: {
    size: "medium",
    variant: "primary",
    icon: <IconLsLabeling />,
    title: t("startLabelingTitle"),
    description: t("startLabelingDescription"),
    actions: (
      <Button variant="primary" look="filled">
        {t("labelAllTasks")}
      </Button>
    ),
  },
};

export const ReviewerEmptyState: Story = {
  args: {
    size: "medium",
    variant: "primary",
    icon: <IconLsReview />,
    title: t("startReviewingTitle"),
    description: t("startReviewingDescription"),
  },
};

export const NoResultsFound: Story = {
  args: {
    size: "medium",
    variant: "warning",
    icon: <IconSearch />,
    title: t("refineSearchTitle"),
    description: t("refineSearchDescription"),
    actions: (
      <Button variant="primary" look="outlined">
        {t("clearFilters")}
      </Button>
    ),
  },
};

export const AssignedTasksEmpty: Story = {
  args: {
    size: "medium",
    variant: "neutral",
    icon: <IconInbox />,
    title: t("waitAssignmentTitle"),
    description: t("waitAssignmentDescription"),
  },
};

export const LabelingQueueComplete: Story = {
  args: {
    size: "medium",
    variant: "positive",
    icon: <IconCheck />,
    title: t("caughtUpTitle"),
    description: t("caughtUpDescription"),
    actions: (
      <Button variant="primary" look="outlined">
        {t("goPreviousTask")}
      </Button>
    ),
  },
};

// Complex Content Example
export const ComplexContent: Story = {
  args: {
    size: "large",
    variant: "primary",
    icon: <IconUpload />,
    title: t("uploadFilesTitle"),
    description: t("uploadFilesDescription"),
    additionalContent: (
      <div className="text-center">
        <Typography variant="label" size="small" className="text-neutral-content-subtler mb-2">
          {t("supportedFormats")}
        </Typography>
        <div className="flex justify-center items-center gap-2 text-neutral-content-subtler">
          <div className="w-2 h-2 bg-positive-icon rounded-full" />
          <Typography variant="label" size="smallest">
            {t("dragDropEnabled")}
          </Typography>
        </div>
      </div>
    ),
    actions: (
      <>
        <Button variant="primary" look="filled" className="flex-1">
          {t("browseFiles")}
        </Button>
        <Button variant="primary" look="outlined" className="flex-1">
          {t("connectStorage")}
        </Button>
        <Button variant="neutral" look="outlined">
          {t("importFromUrl")}
        </Button>
      </>
    ),
    footer: (
      <div className="text-center space-y-1">
        <Typography variant="label" size="small" className="text-primary-link">
          <a href="/docs/import-guide" className="hover:underline">
            {t("importGuide")}
          </a>
        </Typography>
        <Typography variant="label" size="smallest" className="text-neutral-content-subtler">
          {t("maxFileSize")}
        </Typography>
      </div>
    ),
  },
};

// Accessibility Example
export const WithAccessibility: Story = {
  args: {
    size: "medium",
    variant: "primary",
    icon: <IconInbox />,
    title: t("buildCollectionTitle"),
    description: t("buildCollectionDescription"),
    titleId: "accessible-empty-title",
    descriptionId: "accessible-empty-desc",
    "aria-label": t("buildCollectionAria"),
    "data-testid": "accessible-empty-state",
    actions: (
      <Button variant="primary" look="filled">
        {t("addFirstItem")}
      </Button>
    ),
  },
};

// Relations Panel Example
export const RelationsPanel: Story = {
  args: {
    size: "small",
    variant: "primary",
    icon: <IconRelationLink />,
    title: t("relationsTitle"),
    description: t("relationsDescription"),
    actions: (
      <Button variant="primary" look="outlined" size="small">
        {t("addRelation")}
      </Button>
    ),
  },
};
