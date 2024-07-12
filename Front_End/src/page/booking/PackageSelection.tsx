import React from "react";
import { Grid, styled, CardContent, Typography } from "@mui/material";
import { TPackageResponse } from "@/schemaValidations/package.schema";
import FullScreenToggle from "@/components/ToggleFull";

// Styled components với TypeScript
const StyledCard = styled("div")<{ image: string }>(({ image }) => ({
  position: "relative",
  width: 150,
  height: 150,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundImage: `url(${image})`,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  textAlign: "center",
  "&:hover .overlay": {
    opacity: 1,
  },
  // Thêm margin để tạo khoảng cách giữa các thẻ
  margin: "10px",
}));

const Overlay = styled(CardContent)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0,
  transition: "opacity 0.3s",
});

const CardTitle = styled(Typography)({
  color: "#fff",
  fontWeight: "bold",
});

interface PackageSelectionProps {
  dataPackages: TPackageResponse[];
  onSelectPackage: (pkg: TPackageResponse) => void;
  open: boolean;
  onClose: () => void;
}

const PackageSelection: React.FC<PackageSelectionProps> = ({
  dataPackages,
  onSelectPackage,
  open,
  onClose,
}) => {
  return (
    <FullScreenToggle title="Chọn gói dịch vụ" open={open} onClose={onClose}>
      <Grid container spacing={2}>
        {dataPackages.map((item) => {
          // Xử lý trường hợp item.image là mảng
          const imageUrl = Array.isArray(item.image)
            ? item.image[0]
            : item.image;
          return (
            <Grid item key={item._id} xs={12} sm={6} md={4}>
              <StyledCard
                image={imageUrl}
                onClick={() => onSelectPackage(item)}
              >
                <Overlay className="overlay">
                  <CardTitle variant="h5">{item.name}</CardTitle>
                </Overlay>
              </StyledCard>
            </Grid>
          );
        })}
      </Grid>
    </FullScreenToggle>
  );
};

export default PackageSelection;
