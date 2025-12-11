import React, { useRef, useState } from 'react';
import { X, Share2, Zap, Droplets, Download, FileText, Loader2 } from 'lucide-react';
import { Material } from '../types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PROPERTY_ORDER: Record<string, string[]> = {
    'Steel_Chem': ['C', 'Si', 'Mn', 'P', 'S', 'Cr', 'Ni', 'Mo', 'V', 'Cu', 'Fe'],
    'Steel_Mech': ['弹性模量', '屈服强度', '抗拉强度', '断后伸长率', '断面收缩率', '冲击功', '硬度'],
    'Al_Chem': ['Si', 'Fe', 'Cu', 'Mg', 'Mn', 'Cr', 'Zn', 'Ti', 'Al'],
    'Al_Mech': ['弹性模量', '屈服强度', '抗拉强度', '断口伸长率', '硬度', '疲劳强度'],
};

interface MaterialDetailModalProps {
  material: Material;
  onClose: () => void;
}

export const MaterialDetailModal: React.FC<MaterialDetailModalProps> = ({ material, onClose }) => {
  const [isExporting, setIsExporting] = useState(false);
  
  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("链接已复制");
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    
    // Create a temporary container for the print layout
    // This uses a simplified, document-style layout specifically for PDF generation
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '-10000px';
    container.style.left = '0';
    container.style.width = '794px'; // A4 width at ~96 DPI
    container.style.minHeight = '1123px'; // A4 height
    container.style.backgroundColor = '#fff';
    container.style.padding = '40px';
    container.style.boxSizing = 'border-box';
    container.style.fontFamily = '"Noto Sans SC", sans-serif';
    container.style.zIndex = '-1000';
    
    // Inline styles for the generated HTML
    const headerStyle = "border-bottom: 2px solid #1e293b; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-end;";
    const h1Style = "font-size: 28px; font-weight: 800; color: #0f172a; margin: 0; line-height: 1.2;";
    const subHeaderStyle = "font-size: 16px; color: #64748b; margin-top: 5px;";
    const sectionStyle = "margin-bottom: 30px; break-inside: avoid;";
    const sectionTitleStyle = "font-size: 14px; font-weight: 700; color: #1e293b; text-transform: uppercase; border-left: 4px solid #0ea5e9; padding-left: 10px; margin-bottom: 15px;";
    const tableStyle = "width: 100%; border-collapse: collapse; font-size: 12px;";
    const tdLabelStyle = "padding: 8px 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 35%; font-weight: 500;";
    const tdValueStyle = "padding: 8px 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 700;";
    const textStyle = "font-size: 12px; line-height: 1.6; color: #334155; text-align: justify;";
    
    // Helper to generate property tables
    const generateTableHtml = (title: string, data?: Record<string, string>) => {
        if (!data || Object.keys(data).length === 0) return '';
        const rows = Object.entries(data).map(([k, v]) => `
            <tr>
                <td style="${tdLabelStyle}">${k}</td>
                <td style="${tdValueStyle}">${v}</td>
            </tr>
        `).join('');
        return `
            <div style="${sectionStyle}">
                <h3 style="${sectionTitleStyle}">${title}</h3>
                <table style="${tableStyle}">
                    ${rows}
                </table>
            </div>
        `;
    };

    // Construct the clean HTML content
    container.innerHTML = `
        <div style="${headerStyle}">
            <div>
                <h1 style="${h1Style}">${material.name}</h1>
                <div style="${subHeaderStyle}">${material.grade || 'N/A'} <span style="font-size: 12px; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; vertical-align: middle; margin-left: 8px;">${material.category}</span></div>
            </div>
            <div style="text-align: right; font-size: 10px; color: #94a3b8;">
                <div style="font-weight: bold; font-size: 12px; color: #64748b;">AgriMat Digital Data Sheet</div>
                <div>ID: ${material.id}</div>
                <div>Generated: ${new Date().toLocaleDateString()}</div>
            </div>
        </div>

        <div style="display: flex; gap: 40px; margin-bottom: 30px;">
            <div style="flex: 1;">
                 <div style="${sectionStyle}">
                    <h3 style="${sectionTitleStyle}">Basic Information</h3>
                    <table style="${tableStyle}">
                        <tr><td style="${tdLabelStyle}">Standard</td><td style="${tdValueStyle}">${material.standard || '-'}</td></tr>
                        <tr><td style="${tdLabelStyle}">Shape</td><td style="${tdValueStyle}">${material.shape || '-'}</td></tr>
                        <tr><td style="${tdLabelStyle}">Condition</td><td style="${tdValueStyle}">${material.supplyCondition || '-'}</td></tr>
                        <tr><td style="${tdLabelStyle}">Process</td><td style="${tdValueStyle}">${material.process || '-'}</td></tr>
                    </table>
                 </div>
                 
                 <div style="${sectionStyle}">
                    <h3 style="${sectionTitleStyle}">Description</h3>
                    <p style="${textStyle}">${material.description}</p>
                 </div>

                 ${material.applicationParts && material.applicationParts.length > 0 ? `
                 <div style="${sectionStyle}">
                    <h3 style="${sectionTitleStyle}">Typical Applications</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${material.applicationParts.map(p => `
                            <span style="font-size: 10px; background: #f1f5f9; color: #475569; padding: 4px 8px; border-radius: 4px; font-weight: 600; border: 1px solid #cbd5e1;">${p}</span>
                        `).join('')}
                    </div>
                 </div>
                 ` : ''}
            </div>

            <div style="flex: 1;">
                ${material.wearResistance ? `
                    <div style="${sectionStyle}">
                        <h3 style="${sectionTitleStyle}">Wear Resistance</h3>
                        <p style="${textStyle}">${material.wearResistance}</p>
                    </div>
                ` : ''}
                
                ${material.corrosionResistance ? `
                    <div style="${sectionStyle}">
                        <h3 style="${sectionTitleStyle}">Corrosion Resistance</h3>
                        <p style="${textStyle}">${material.corrosionResistance}</p>
                    </div>
                ` : ''}

                ${generateTableHtml('Chemical Composition', material.chemicalComposition)}
            </div>
        </div>

        <div style="${sectionStyle}">
             <div style="display: flex; gap: 40px; align-items: flex-start;">
                <div style="flex: 1;">
                    ${generateTableHtml('Mechanical Properties', material.mechanicalProperties)}
                </div>
                <div style="flex: 1;">
                    ${generateTableHtml('Physical Properties', material.physicalProperties)}
                    ${generateTableHtml('Thermal Properties', material.thermalProperties)}
                    ${generateTableHtml('Characteristics', material.characteristicProperties)}
                </div>
             </div>
        </div>
        
        <div style="margin-top: 50px; border-top: 1px solid #e2e8f0; padding-top: 10px; text-align: center; font-size: 10px; color: #cbd5e1;">
            Generated by AgriMat Digital Platform
        </div>
    `;

    document.body.appendChild(container);

    try {
        const canvas = await html2canvas(container, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = 210;
        const pdfHeight = 297;
        const imgProps = pdf.getImageProperties(imgData);
        
        // Calculate height based on A4 width
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        let heightLeft = imgHeight;
        let position = 0;
        
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        // Multi-page handling
        while (heightLeft > 0) {
            position = heightLeft - imgHeight; // This logic typically places new page at the remaining top
            // Simpler multi-page logic:
            // Just add new pages and offset the image. 
            // However, a simple way for long content is usually just adding the image shifted up.
            // But html2canvas captures the whole tall div as one image.
            pdf.addPage();
            // Calculate position for the next page segment
            pdf.addImage(imgData, 'JPEG', 0, -(pdfHeight * (Math.ceil(imgHeight / pdfHeight) - Math.ceil(heightLeft / pdfHeight))), pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save(`${material.name}_${material.grade}_Report.pdf`);

    } catch (err) {
        console.error('PDF Export Error:', err);
        alert('导出 PDF 失败，请检查网络或重试');
    } finally {
        document.body.removeChild(container);
        setIsExporting(false);
    }
  };

  const handleExportCSV = () => {
    // 1. Build CSV Content
    let csvContent = "Category,Property,Value\n";
    
    // Basic Info
    csvContent += `Basic,Name,${material.name}\n`;
    csvContent += `Basic,Grade,${material.grade || ''}\n`;
    csvContent += `Basic,Category,${material.category}\n`;
    csvContent += `Basic,Standard,${material.standard || ''}\n`;
    csvContent += `Basic,Shape,${material.shape || ''}\n`;
    csvContent += `Basic,Condition,${material.supplyCondition || ''}\n`;
    csvContent += `Basic,Process,${material.process || ''}\n`;
    csvContent += `Basic,Description,"${material.description.replace(/"/g, '""')}"\n`;

    // Helper to add group properties
    const addProperties = (groupName: string, data?: Record<string, string>) => {
        if (!data) return;
        Object.entries(data).forEach(([key, value]) => {
            csvContent += `${groupName},"${key}","${value}"\n`;
        });
    };

    addProperties("Chemical Composition", material.chemicalComposition);
    addProperties("Mechanical Properties", material.mechanicalProperties);
    addProperties("Physical Properties", material.physicalProperties);
    addProperties("Thermal Properties", material.thermalProperties);
    addProperties("Characteristics", material.characteristicProperties);

    if (material.wearResistance) csvContent += `Performance,Wear Resistance,"${material.wearResistance}"\n`;
    if (material.corrosionResistance) csvContent += `Performance,Corrosion Resistance,"${material.corrosionResistance}"\n`;

    // 2. Create Download Link with BOM
    const bom = '\uFEFF'; 
    const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${material.name}_${material.grade || 'Data'}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const DataTable = ({ title, data, orderKey }: { title: string, data?: Record<string, string>, orderKey?: string }) => {
      if (!data) return null;
      const keys = orderKey && PROPERTY_ORDER[orderKey] ? PROPERTY_ORDER[orderKey] : Object.keys(data);
      const validKeys = keys.filter(k => data[k]);
      
      if (validKeys.length === 0) return null;

      return (
          <div className="mb-8 break-inside-avoid">
              <h4 className="text-base font-bold text-slate-900 uppercase border-b-2 border-slate-800 pb-2 mb-3 tracking-wide">{title}</h4>
              <table className="w-full text-base border-collapse">
                  <tbody>
                      {validKeys.map((key, index) => (
                          <tr key={key} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                              <td className="py-2.5 pl-3 pr-4 text-slate-600 font-medium text-sm border-b border-slate-100 w-1/3">{key}</td>
                              <td className="py-2.5 px-3 text-slate-900 font-mono font-bold text-base border-b border-slate-100">{data[key]}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in print:bg-white print:p-0 print:absolute">
      {/* Detail Modal Content - The displayed UI */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col overflow-hidden ring-1 ring-slate-900/5 print:shadow-none print:max-w-none print:max-h-none print:h-auto print:rounded-none print:ring-0">
         
         {/* Technical Sheet Header */}
         <div className="bg-slate-50 border-b border-slate-200 px-8 py-5 flex justify-between items-start shrink-0 print:bg-white print:border-b-2 print:border-slate-800">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-600 border border-slate-300 px-2 py-0.5 rounded-sm">
                        Technical Data Sheet
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-medium">REF: {material.id}</span>
                </div>
                <div className="flex items-baseline gap-4 mt-1">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{material.name}</h2>
                    <span className="text-2xl font-mono text-agri-600 font-bold bg-agri-50 px-2 rounded-md print:bg-transparent print:text-slate-800 print:border print:border-slate-800">{material.grade}</span>
                </div>
            </div>
            
            <div className="flex gap-2 print:hidden">
                <button onClick={handleExportPDF} disabled={isExporting} className="flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-white bg-agri-600 hover:bg-agri-500 rounded-lg transition shadow-sm disabled:opacity-70 disabled:cursor-not-allowed" title="Export PDF">
                    {isExporting ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
                    <span className="hidden sm:inline">导出 PDF</span>
                </button>
                <button onClick={handleExportCSV} className="flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:border-agri-500 hover:text-agri-600 rounded-lg transition" title="Export CSV">
                    <Download size={18} />
                    <span className="hidden sm:inline">CSV</span>
                </button>
                <div className="w-px bg-slate-200 mx-1"></div>
                <button onClick={copyLink} className="p-2.5 text-slate-500 hover:text-agri-600 hover:bg-white rounded-lg transition border border-transparent hover:border-slate-200" title="Copy Link">
                    <Share2 size={20} />
                </button>
                <button onClick={onClose} className="p-2.5 text-slate-500 hover:text-red-600 hover:bg-white rounded-lg transition border border-transparent hover:border-slate-200" title="Close">
                    <X size={24} />
                </button>
            </div>
         </div>

         {/* Content Area */}
         <div className="flex-1 overflow-y-auto custom-scrollbar bg-white p-8 print:overflow-visible print:p-0 print:mt-4">
            
            {/* Quick Specs Bar */}
            <div className="flex flex-wrap gap-px bg-slate-200 border border-slate-200 mb-10 rounded-lg overflow-hidden print:bg-white print:border-0 print:gap-4">
                {[
                    { label: 'Category', value: material.category },
                    { label: 'Standard', value: material.standard },
                    { label: 'Shape', value: material.shape },
                    { label: 'Condition', value: material.supplyCondition },
                    { label: 'Process', value: material.process }
                ].map((item, i) => (
                    <div key={i} className="bg-slate-50 px-5 py-3 flex-1 min-w-[160px] print:bg-white print:border print:border-slate-200 print:p-2 print:min-w-0">
                        <div className="text-xs text-slate-500 uppercase font-bold mb-1 tracking-wide">{item.label}</div>
                        <div className="text-slate-900 font-bold text-base truncate">{item.value || '-'}</div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-10 print:flex-row">
                
                {/* Left Column: Description & Metadata */}
                <div className="lg:w-5/12 space-y-10 print:w-5/12">
                    <div>
                        <h3 className="text-base font-bold text-slate-900 uppercase mb-4 flex items-center border-l-4 border-agri-500 pl-3">
                            Description
                        </h3>
                        <p className="text-base text-slate-700 leading-relaxed text-justify">
                            {material.description}
                        </p>
                    </div>

                    {(material.wearResistance || material.corrosionResistance) && (
                        <div>
                             <h3 className="text-base font-bold text-slate-900 uppercase mb-4 border-l-4 border-tech-500 pl-3">Performance</h3>
                             <div className="space-y-3">
                                {material.wearResistance && (
                                    <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-lg text-base print:bg-white print:border-slate-200">
                                        <Zap size={20} className="text-amber-600 shrink-0 mt-0.5 print:text-slate-800"/> 
                                        <div className="text-amber-900 font-medium print:text-slate-800">{material.wearResistance}</div>
                                    </div>
                                )}
                                {material.corrosionResistance && (
                                    <div className="flex items-start gap-3 p-4 bg-sky-50 border border-sky-100 rounded-lg text-base print:bg-white print:border-slate-200">
                                        <Droplets size={20} className="text-sky-600 shrink-0 mt-0.5 print:text-slate-800"/> 
                                        <div className="text-sky-900 font-medium print:text-slate-800">{material.corrosionResistance}</div>
                                    </div>
                                )}
                             </div>
                        </div>
                    )}

                    <div>
                        <h3 className="text-base font-bold text-slate-900 uppercase mb-4 border-l-4 border-slate-500 pl-3">Applications</h3>
                        <div className="flex flex-wrap gap-2.5">
                            {material.applicationParts.map((p, i) => (
                                <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-bold border border-slate-200 rounded-md print:bg-white print:border-slate-300">
                                    {p}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Data Tables */}
                <div className="lg:w-7/12 print:w-7/12">
                     <div className="grid grid-cols-1 gap-8">
                        {material.category === '钢材' && (
                            <>
                                <DataTable title="Chemical Composition (%)" data={material.chemicalComposition} orderKey="Steel_Chem" />
                                <DataTable title="Mechanical Properties" data={material.mechanicalProperties} orderKey="Steel_Mech" />
                                <DataTable title="Physical & Thermal" data={{...material.physicalProperties, ...material.thermalProperties}} />
                            </>
                        )}
                        {material.category === '铝合金' && (
                            <>
                                <DataTable title="Chemical Composition (%)" data={material.chemicalComposition} orderKey="Al_Chem" />
                                <DataTable title="Mechanical Properties" data={material.mechanicalProperties} orderKey="Al_Mech" />
                                <DataTable title="Physical & Thermal" data={{...material.physicalProperties, ...material.thermalProperties}} />
                            </>
                        )}
                        {material.category === '涂层材料' && (
                            <>
                                <DataTable title="Characteristics" data={material.characteristicProperties} />
                                <DataTable title="Composition" data={material.chemicalComposition} />
                                <DataTable title="Coating Performance" data={material.mechanicalProperties} />
                                <DataTable title="Physical Properties" data={material.physicalProperties} />
                            </>
                        )}
                     </div>
                </div>

            </div>
         </div>
         
         {/* Footer */}
         <div className="bg-slate-50 border-t border-slate-200 px-8 py-3 flex justify-between items-center text-xs text-slate-500 print:hidden">
            <span>AgriMat Digital © 2024</span>
            <span className="font-mono">Generated: {new Date().toLocaleDateString()}</span>
         </div>

      </div>
    </div>
  );
};