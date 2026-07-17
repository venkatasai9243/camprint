import { PrintConfig } from '../types';

export const calculateManualPrice = (basePrice: number, pages: number, config: PrintConfig): number => {
  let price = basePrice;

  // Paper cost calculation
  let costPerPage = 1.0; // Base cost for A4 Single Sided B&W
  
  if (config.paperSize === 'letter') costPerPage += 0.5;
  if (config.color) costPerPage += 4.0;
  
  // Double sided saves 30% of total page material cost roughly
  const totalPages = config.singleSided ? pages : Math.ceil(pages / 2);
  price += totalPages * costPerPage;

  // Binding costs
  switch (config.bindingType) {
    case 'spiral':
      price += 30;
      break;
    case 'softbound':
      price += 60;
      break;
    case 'hardbound':
      price += 150;
      break;
    case 'none':
    default:
      break;
  }

  // Multiply by copies
  return Math.ceil(price * config.copies);
};
