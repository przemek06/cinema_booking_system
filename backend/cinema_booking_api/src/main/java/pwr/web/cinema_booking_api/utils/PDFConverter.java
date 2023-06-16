package pwr.web.cinema_booking_api.utils;

import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.styledxmlparser.jsoup.Jsoup;
import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfCopy;
import com.itextpdf.text.pdf.PdfReader;
import org.xhtmlrenderer.pdf.ITextRenderer;
import pwr.web.cinema_booking_api.pdf.ProfileImageReplacedElementFactory;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Random;

public class PDFConverter {

    public static OutputStream convertHtmlToPdf(String html, InputStream image) throws IOException {
        OutputStream outputStream = new ByteArrayOutputStream();

        try {

            com.itextpdf.styledxmlparser.jsoup.nodes.Document document = Jsoup.parse(html);
            document.outputSettings().syntax(com.itextpdf.styledxmlparser.jsoup.nodes.Document.OutputSettings.Syntax.xml);
            String xhtml = document.html();

            ITextRenderer renderer = new ITextRenderer();
            renderer.getSharedContext().setReplacedElementFactory(new ProfileImageReplacedElementFactory(renderer.getSharedContext().getReplacedElementFactory(), image));
            renderer.setDocumentFromString(xhtml);
            renderer.layout();
            renderer.createPDF(outputStream);

        } catch (Exception e) {
           throw new IOException();

        } finally {
//            document.close();
        }

        return outputStream;
    }


    public static OutputStream mergePdfDocuments(List<OutputStream> pdfFiles) throws IOException {
        ByteArrayOutputStream mergedPdfOutputStream = new ByteArrayOutputStream();

        // Create a new document
        Document document = new Document();

        try {
            // Create a PdfCopy object to merge the PDFs
            PdfCopy copy = new PdfCopy(document, mergedPdfOutputStream);

            // Open the document
            document.open();

            // Iterate through each PDF OutputStream
            for (OutputStream pdfFile : pdfFiles) {
                // Create a PdfReader for the current PDF OutputStream
                PdfReader reader = new PdfReader(((ByteArrayOutputStream) pdfFile).toByteArray());

                // Merge the pages of the current PDF into the destination document
                for (int i = 1; i <= reader.getNumberOfPages(); i++) {
                    copy.addPage(copy.getImportedPage(reader, i));
                }

                // Close the PdfReader
                reader.close();
            }

            System.out.println("PDF documents merged successfully.");
        } catch (Exception e) {
            throw new IOException();
        } finally {
            // Close the document
            document.close();
        }

        return mergedPdfOutputStream;
    }

    public static String randomNumber() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < 12; i++) {
            int randomNumber = random.nextInt();
            sb.append(randomNumber).append(" ");
        }

        return sb.toString().trim();
    }


}
