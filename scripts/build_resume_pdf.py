#!/usr/bin/env python3
"""Create a clean downloadable résumé PDF from the user's Oct 26, 2026 source content."""
import json, os
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether, HRFlowable

BASE = Path(__file__).resolve().parents[1]
DATA = json.loads((BASE / "_data" / "latest_resume.json").read_text(encoding="utf-8"))
OUT = BASE / "assets" / "resume" / "Bethel_Adekogbe_Educational_Media_Resume.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)

font_dir = Path("/usr/share/fonts/truetype/dejavu")
pdfmetrics.registerFont(TTFont("DejaVu", str(font_dir / "DejaVuSans.ttf")))
pdfmetrics.registerFont(TTFont("DejaVu-Bold", str(font_dir / "DejaVuSans-Bold.ttf")))
pdfmetrics.registerFontFamily("DejaVu", normal="DejaVu", bold="DejaVu-Bold", italic="DejaVu", boldItalic="DejaVu-Bold")
INK = colors.HexColor("#23323B")
SECONDARY = colors.HexColor("#46565F")
SUBTLE = colors.HexColor("#86979D")
DIVIDER = colors.HexColor("#CBD5D6")

styles = {
 "name": ParagraphStyle("name", fontName="DejaVu-Bold", fontSize=19, leading=22, textColor=INK, spaceAfter=5),
 "contact": ParagraphStyle("contact", fontName="DejaVu", fontSize=8.2, leading=11.2, textColor=SECONDARY, spaceAfter=2),
 "section": ParagraphStyle("section", fontName="DejaVu-Bold", fontSize=9.4, leading=12.3, textColor=INK, spaceBefore=9, spaceAfter=4),
 "body": ParagraphStyle("body", fontName="DejaVu", fontSize=8.15, leading=11.55, textColor=SECONDARY, spaceAfter=3),
 "job": ParagraphStyle("job", fontName="DejaVu-Bold", fontSize=8.45, leading=11.7, textColor=INK, spaceBefore=4, spaceAfter=1),
 "role": ParagraphStyle("role", fontName="DejaVu", fontSize=7.95, leading=10.6, textColor=SECONDARY, spaceAfter=2),
 "bullet": ParagraphStyle("bullet", fontName="DejaVu", fontSize=7.9, leading=11.25, textColor=INK, leftIndent=11, firstLineIndent=-9, spaceAfter=2),
}
def para(text, style="body"):
    return Paragraph(escape(text).replace("\n","<br/>"), styles[style])
doc = SimpleDocTemplate(str(OUT), pagesize=letter, rightMargin=39, leftMargin=39, topMargin=32, bottomMargin=37,
    title="Bethel Adekogbe — Educational Media Resume", author="Bethel Adekogbe", subject="Professional resume")
story = [
 para(DATA["name"].upper(), "name"),
 para("  |  ".join([DATA["location"],DATA["email"],DATA["phone"],DATA["portfolio"]]),"contact"),
 Spacer(1,5), HRFlowable(width="100%",thickness=0.7,color=DIVIDER),
 para("PROFESSIONAL SUMMARY","section"),para(DATA["summary"]),
 para("CORE COMPETENCIES","section"),
 para("   •   ".join(DATA["competencies"])),
 para("PROFESSIONAL EXPERIENCE","section")
]
for job in DATA["roles"]:
    parts=[para(job["company"]+"  |  "+job["location"],"job"),para(job["title"]+"  •  "+job["dates"],"role")]
    parts += [para("•  "+bullet, "bullet") for bullet in job["bullets"]]
    story.append(KeepTogether(parts[:3]))
    story.extend(parts[3:])
story.extend([
 para("EDUCATION","section"),para(DATA["education"]),
 para("TECHNICAL SKILLS","section")
])
for area,tools in DATA["skills"]:
    story.append(para(area+":  "+tools))
def footer(canvas, pdf_doc):
    canvas.saveState()
    w,h=letter
    canvas.setStrokeColor(DIVIDER)
    canvas.line(39,29,w-39,29)
    canvas.setFont("DejaVu",7)
    canvas.setFillColor(SUBTLE)
    canvas.drawString(39,18,"BETHEL ADEKOGBE  /  EDUCATIONAL MEDIA")
    canvas.drawRightString(w-39,18,f"{pdf_doc.page}")
    canvas.restoreState()
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print("Created",OUT, OUT.stat().st_size,"bytes")
